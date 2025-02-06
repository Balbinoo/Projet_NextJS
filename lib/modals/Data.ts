
import {Schema, models, model} from "mongoose";

const DataSchema = new Schema(
  {
  title: {type:String, required: true},
  body: {type:String, required: true},
  createdAt: { type: Date, default: Date.now },
}
);


const Data = models.Data || model("Data", DataSchema);

export default Data;
