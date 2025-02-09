import { NextResponse } from "next/server";
import connect from "../../../lib/mongodb";
import Game from "../../../lib/modals/FreeToGame";

type GameData = {
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
};

export async function GET() {
  try {
    await connect();

    // Fetch data from the FreeToGame API
    const response = await fetch("https://www.freetogame.com/api/games?platform=pc");
    const apiGameData: GameData[] = await response.json();

    // Format the API data to match the MongoDB schema
    const formattedGames = apiGameData.map((game: GameData) => ({
      title: game.title,
      thumbnail: game.thumbnail,
      short_description: game.short_description,
      game_url: game.game_url,
      genre: game.genre,
      platform: game.platform,
      publisher: game.publisher,
      developer: game.developer,
      release_date: game.release_date,
      freetogame_profile_url: game.freetogame_profile_url,
    }));

    await Game.insertMany(formattedGames, { ordered: false }).catch(() => {
      console.error("Duplicate entries detected, skipping...");
    });

    return NextResponse.json({ message: "Data saved" });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching data", error: error instanceof Error ? error.message : error }, { status: 500 });
  }
}