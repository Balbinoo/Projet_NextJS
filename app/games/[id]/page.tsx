"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Use useParams instead of useRouter
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { auth } from "../../firebase/config"; // Import Firebase auth

interface Game {
  _id: string;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
}

export default function GameDetails() {
  const { id } = useParams(); // Get game ID from URL
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false); // Track if the game is a favorite
  const [favoriteLoading, setFavoriteLoading] = useState(false); // Track favorite button loading state

  // Fetch game details
  useEffect(() => {
    if (!id) return;

    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/gameData?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch game details.");

        const data = await response.json();
        setGame(data.data); // Access "data" field inside API response
      } catch (err) {
        console.error("Error fetching game details:", err);
        setError("Failed to load game details.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  // Check if the game is already in the user's favorites
  const checkIfFavorite = async () => {
    if (!id || !auth.currentUser?.uid) return;

    try {
      const userId = auth.currentUser?.uid;
      const response = await fetch(`/api/favorites?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to check favorites.");

      const data = await response.json();

      // ✅ Check if this specific game is in the favorites list
      const isGameFavorited = data.data.some((fav: Game) => fav._id === id);
      setIsFavorite(isGameFavorited);
    } catch (err) {
      console.error("Error checking favorites:", err);
    }
  };

  // Call checkIfFavorite when the component mounts or when the game ID changes
  useEffect(() => {
    checkIfFavorite();
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!auth.currentUser?.uid) {
      alert("You must be logged in to manage favorites.");
      return;
    }
  
    setFavoriteLoading(true);
  
    try {
      const userId = auth.currentUser.uid;
      const endpoint = `/api/favorites`;
      const method = isFavorite ? "DELETE" : "POST";
  
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, gameId: id }),
      });
  
      if (!response.ok) throw new Error(isFavorite ? "Failed to remove favorite." : "Failed to add favorite.");
  
      // ✅ Toggle favorite state for the current game
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error toggling favorite:", err);
      alert(isFavorite ? "Failed to remove favorite." : "Failed to add favorite.");
    } finally {
      setFavoriteLoading(false);
    }
  };
  

  if (loading) return <p className="text-center text-gray-700">Loading game details...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!game) return <p className="text-center text-gray-600">Game not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <div className="py-10 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Image 
            src={game.thumbnail} 
            alt={game.title} 
            width={500}
            height={300}
            className="w-full h-64 object-cover rounded-md" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">{game.title}</h1>
          <p className="text-gray-600 mt-2">{game.genre}</p>
          <p className="text-gray-700 mt-4">{game.short_description}</p>
          <p className="text-sm text-gray-500 mt-2">Platform: {game.platform}</p>
          <p className="text-sm text-gray-500">Publisher: {game.publisher}</p>
          <p className="text-sm text-gray-500">Developer: {game.developer}</p>
          <p className="text-sm text-gray-500">Release Date: {game.release_date}</p>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleFavoriteToggle}
              disabled={favoriteLoading}
              className={`px-4 py-2 ${
                isFavorite ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-lg transition`}
            >
              {favoriteLoading ? "Loading..." : isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>

          <a href={game.game_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-4 block">
            Play Now
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}