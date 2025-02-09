"use client";

import { useState, useEffect } from "react";
import { auth } from "../../firebase/config"; // Import Firebase auth
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import CategoryFilter from "../../components/CategoryFilter";
import GameList from "../../components/GameList";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

interface Game {
  _id: string;
  title: string;
  thumbnail: string;
  genre: string;
}

export default function FavoritesPage() {
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 9;

  // Fetch user's favorite games
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const userId = auth.currentUser?.uid;

        if (!userId) {
          setError("You must be logged in to view favorites.");
          setLoading(false);
          return;
        }

        // Fetch favorite game IDs for the user
        const favoritesResponse = await fetch(`/api/favorites?userId=${userId}`);
        if (!favoritesResponse.ok) throw new Error("Failed to fetch favorites.");

        const favoritesData = await favoritesResponse.json();
        const favoriteGameIds = favoritesData.data.map((favorite: any) => favorite.gameId);

        // Fetch details of favorite games
        const gamesResponse = await fetch("/api/gameData");
        if (!gamesResponse.ok) throw new Error("Failed to fetch games.");

        const allGames = await gamesResponse.json();
        const favoriteGames = allGames.filter((game: Game) =>
          favoriteGameIds.includes(game._id)
        );

        setFavoriteGames(favoriteGames);
        setFilteredGames(favoriteGames);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Failed to load favorites. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Apply search & multiple category filter
  useEffect(() => {
    let filtered = favoriteGames;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((game) =>
        selectedCategories.includes(game.genre)
      );
    }

    setFilteredGames(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, favoriteGames]);

  // Get current page's games
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <NavBar />

      <div className="py-10 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Your Favorite Games ❤️
        </h1>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Loading & Game List */}
        {loading ? (
          <p className="text-center text-gray-700">Loading favorites...</p>
        ) : (
          <>
            {filteredGames.length > 0 ? (
              <>
                <GameList games={currentGames} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredGames.length / gamesPerPage)}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <p className="text-center text-gray-600">No favorite games found.</p>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}