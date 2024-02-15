import * as mongoose from "mongoose";
interface ColorDocument extends mongoose.Document {
  name: string;
}
const ColorSchema = new mongoose.Schema<ColorDocument>(
  {
    name: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
export default mongoose.models.Color ||
  mongoose.model<ColorDocument>("Color", ColorSchema);
