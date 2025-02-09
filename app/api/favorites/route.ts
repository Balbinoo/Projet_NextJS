import { NextResponse } from "next/server";
import connect from "../../../lib/mongodb";
import Favorite from "../../../lib/modals/Favorite";
import { Types } from "mongoose";

// GET - get all favorites for a user
export const GET = async (request: Request) => {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Missing userId" }), { status: 400 });
    }

    // get all favorites for the user
    const favorites = await Favorite.find({ userId });
    return new NextResponse(JSON.stringify({ message: "Favorites retrieved", data: favorites }), { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error retrieving favorites", error }, { status: 500 });
  }
};

// POST - Add a game to favorites
export const POST = async (request: Request) => {
  try {
    const { userId, gameId } = await request.json();

    if (!userId || !gameId) {
      return new NextResponse(JSON.stringify({ message: "Missing userId or gameId" }), { status: 400 });
    }

    await connect();

    // Check if the favorite already exists
    const existingFavorite = await Favorite.findOne({ userId, gameId });
    if (existingFavorite) {
      return new NextResponse(JSON.stringify({ message: "Game is already in favorites" }), { status: 409 });
    }

    // Create a new favorite
    const newFavorite = new Favorite({ userId, gameId });
    await newFavorite.save();

    return new NextResponse(JSON.stringify({ message: "Game added to favorites", data: newFavorite }), { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding favorite", error }, { status: 500 });
  }
};

// DELETE - Remove a game from favorites
export const DELETE = async (request: Request) => {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const gameId = searchParams.get("gameId");

    if (!userId || !gameId) {
      return new NextResponse(JSON.stringify({ message: "Missing userId or gameId" }), { status: 400 });
    }

    // Find and delete the favorite
    const deletedFavorite = await Favorite.findOneAndDelete({ userId, gameId });

    if (!deletedFavorite) {
      return new NextResponse(JSON.stringify({ message: "Favorite not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({ message: "Game removed from favorites" }), { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error removing favorite", error }, { status: 500 });
  }
};