import { Schema, models, model } from "mongoose";

const GameSchema = new Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    short_description: { type: String, required: true },
    game_url: { type: String, required: true },
    genre: { type: String, required: true },
    platform: { type: String, required: true },
    publisher: { type: String, required: true },
    developer: { type: String, required: true },
    release_date: { type: String, required: true }, 
    freetogame_profile_url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, 
  },
  { timestamps: true }
);

const Game = models.Game || model("Game", GameSchema);

export default Game;
