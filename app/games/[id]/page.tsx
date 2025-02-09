"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Use useParams instead of useRouter
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Image from "next/image";

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

  if (loading) return <p className="text-center text-gray-700">Loading game details...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!game) return <p className="text-center text-gray-600">Game not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <div className="py-10 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Image src={game.thumbnail} alt={game.title} className="w-full h-64 object-cover rounded-md" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">{game.title}</h1>
          <p className="text-gray-600 mt-2">{game.genre}</p>
          <p className="text-gray-700 mt-4">{game.short_description}</p>
          <p className="text-sm text-gray-500 mt-2">Platform: {game.platform}</p>
          <p className="text-sm text-gray-500">Publisher: {game.publisher}</p>
          <p className="text-sm text-gray-500">Developer: {game.developer}</p>
          <p className="text-sm text-gray-500">Release Date: {game.release_date}</p>
          <a href={game.game_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-4 block">
            Play Now
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
