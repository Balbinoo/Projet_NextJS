"use client";

interface GameCardProps {
  game: {
    _id: string;
    title: string;
    thumbnail: string;
    short_description: string;
    genre: string;
    platform: string;
  };
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-all">
      <img
        src={game.thumbnail}
        alt={game.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-900">{game.title}</h3>
      <p className="text-gray-700 text-sm mb-2">{game.short_description}</p>
      <span className="text-blue-500 text-xs font-semibold">{game.genre}</span>
      <p className="text-gray-500 text-xs">Platform: {game.platform}</p>
    </div>
  );
}
