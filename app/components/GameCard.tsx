"use client";

import Link from "next/link";

interface GameCardProps {
  game: {
    _id: string;
    title: string;
    thumbnail: string;
    genre: string;
  };
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game._id}`} passHref>
      <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img src={game.thumbnail} alt={game.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">{game.title}</h2>
          <p className="text-sm text-gray-600">{game.genre}</p>
        </div>
      </div>
    </Link>
  );
}
