"use client";

import GameCard from "./GameCard";

interface GameListProps {
  games: {
    _id: string;
    title: string;
    thumbnail: string;
    short_description: string;
    genre: string;
    platform: string;
  }[];
}

export default function GameList({ games }: GameListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {games.length > 0 ? (
        games.map((game) => <GameCard key={game._id} game={game} />)
      ) : (
        <p className="text-center text-gray-600">No games found.</p>
      )}
    </div>
  );
}
