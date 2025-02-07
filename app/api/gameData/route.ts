import { NextResponse } from "next/server";
import connect from "../../../lib/mongodb";
import Game from "../../../lib/modals/FreeToGame";
import { Types } from "mongoose";

// GET - Fetch games (all or by title)
export const GET = async (request: Request) => {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");

    if (title) {
      const game = await Game.findOne({ title });

      if (!game) {
        return new NextResponse(
          JSON.stringify({ message: "No game found for the given title" }),
          { status: 404 }
        );
      }

      return new NextResponse(JSON.stringify({ message: "Game retrieved", data: game }), { status: 200 });
    }

    // If no title is provided, return all games
    const games = await Game.find();
    return new NextResponse(JSON.stringify(games), { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error retrieving data", error }, { status: 500 });
  }
};

// POST - Add a new game
export const POST = async (request: Request) => {
  try {
    const {
      id,
      title,
      thumbnail,
      short_description,
      game_url,
      genre,
      platform,
      publisher,
      developer,
      release_date,
      freetogame_profile_url,
    } = await request.json();

    await connect();

    // Check if the game already exists (prevent duplicate entries)
    const existingGame = await Game.findOne({ id });
    if (existingGame) {
      return new NextResponse(JSON.stringify({ message: "Game already exists" }), { status: 409 });
    }

    const newGame = new Game({
      id,
      title,
      thumbnail,
      short_description,
      game_url,
      genre,
      platform,
      publisher,
      developer,
      release_date,
      freetogame_profile_url,
    });

    await newGame.save();

    return new NextResponse(JSON.stringify({ message: "Game saved", data: newGame }), { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving game", error }, { status: 500 });
  }
};

// PATCH - Update an existing game by ID
export const PATCH = async (request: Request) => {
  try {
    await connect();
    const { id, ...updateFields } = await request.json();

    if (!id || !Types.ObjectId.isValid(id)) {
      return new NextResponse(JSON.stringify({ message: "Invalid or missing ID" }), { status: 400 });
    }

    const updatedGame = await Game.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedGame) {
      return new NextResponse(JSON.stringify({ message: "Game not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({ message: "Game updated", data: updatedGame }), { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating game", error }, { status: 500 });
  }
};

// DELETE - Remove a game by ID
export const DELETE = async (request: Request) => {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !Types.ObjectId.isValid(id)) {
      return new NextResponse(JSON.stringify({ message: "Invalid or missing ID" }), { status: 400 });
    }

    const deletedGame = await Game.findByIdAndDelete(id);

    if (!deletedGame) {
      return new NextResponse(JSON.stringify({ message: "Game not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({ message: "Game deleted successfully" }), { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting game", error }, { status: 500 });
  }
};
