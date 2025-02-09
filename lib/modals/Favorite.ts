// models/Favorite.js
import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Firebase User ID
  gameId: { type: String, required: true }, // ID of the game
});

const Favorite = mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;