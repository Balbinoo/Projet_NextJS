import { NextResponse } from "next/server";
import connect from "../../../lib/mongodb";
import Game from "../../../lib/modals/FreeToGame";

export async function GET() {
  try {
    await connect();

    // Fetch data from the FreeToGame API
    const response = await fetch("https://www.freetogame.com/api/games?platform=pc");
    const apiGameData = await response.json();

    // Format the API data to match the MongoDB schema
    const formattedGames = apiGameData.map((game: any) => ({
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

    const savedGames = await Game.insertMany(formattedGames, { ordered: false }).catch(err => {
      console.error("Duplicate entries detected, skipping...");
    });

    return NextResponse.json({ message: "Data saved", data: savedGames });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching data", error }, { status: 500 });
  }
}
