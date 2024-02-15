import { models, model, Document, Schema } from "mongoose";
type ColorsItem = {
  colorId: MongooseIDSchema;
};
type MongooseIDSchema = {
  type: Schema.Types.ObjectId;
  ref: string;
};
type TagsItem = {
  tagId: MongooseIDSchema;
};
interface TemplateFrameDocument extends Document {
  fullImageUrl?: string;
  frameUrl?: string;
  name?: string;
  height?: number;
  width?: number;
  displayImageHeight?: number;
  displayImageWidth?: number;
  type?: string;
  categoryId?: MongooseIDSchema;
  subCategoryId?: string;
  workspaceId?: string;
  colorIds?: ColorsItem[];
  tagIds?: TagsItem[];
}
const TemplateFrameSchema = new Schema<TemplateFrameDocument>(
  {
    fullImageUrl: { type: String, default: "" },
    frameUrl: { type: String, default: "" },
    name: { type: String, default: "" },
    height: { type: Number },
    width: { type: Number },
    displayImageHeight: { type: Number },
    displayImageWidth: { type: Number },
    type: { type: String, default: "" },
    categoryId: { type: Schema.Types.ObjectId, ref: "Catalogue" },
    subCategoryId: { type: String, default: "" },
    workspaceId: { type: String, default: "" },
    colorIds: [
      {
        colorId: {
          type: Schema.Types.ObjectId,
          ref: "Color",
        },
      },
    ],
    tagIds: [
      {
        tagId: {
          type: Schema.Types.ObjectId,
          ref: "TemplateTag",
        },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
export default models.TemplateFrame ||
  model<TemplateFrameDocument>("TemplateFrame", TemplateFrameSchema);
