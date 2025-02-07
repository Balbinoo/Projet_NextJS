"use client";

import { useState, useEffect } from "react";
import SearchBar from "./../../components/SearchBar"; 
import Pagination from "./../../components/Pagination"; 
import CategoryFilter from "./../../components/CategoryFilter";
import GameList from "./../../components/GameList";

interface Game {
  _id: string;
  title: string;
  thumbnail: string;
  short_description: string;
  genre: string;
  platform: string;
}

export default function DataPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/gameData");
        if (!response.ok) throw new Error("Failed to fetch games.");
        
        const result = await response.json();
        setGames(result);
        setFilteredGames(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load games. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply search & multiple category filter
  useEffect(() => {
    let filtered = games;

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
  }, [searchTerm, selectedCategories, games]);

  // Get current page's games
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Free-to-Play Games List 🎮
        </h1>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Category Filter */}
        <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />

        {/* Error Message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Loading & Game List */}
        {loading ? (
          <p className="text-center text-gray-700">Loading games...</p>
        ) : (
          <>
            <GameList games={currentGames} />
            <Pagination 
              currentPage={currentPage}
              totalPages={Math.ceil(filteredGames.length / gamesPerPage)}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
