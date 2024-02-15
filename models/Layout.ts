import { model, models, Schema, Document } from "mongoose";
interface LayoutDocument extends Document {
  name: string;
  height: number;
  width: number;
}
const LayoutSchema = new Schema<LayoutDocument>(
  {
    name: { type: String, default: "" },
    height: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default models.Layout || model<LayoutDocument>("Layout", LayoutSchema);
