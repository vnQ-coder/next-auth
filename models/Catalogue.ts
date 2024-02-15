import { models, Schema, model, Document } from "mongoose";
interface CatalogueDocument extends Document {
  name: string;
  workspaceId: string;
  isDeleted: boolean;
  isDefault: boolean;
  images: {
    type: [
      {
        url: string;
        name: string;
      }
    ];
    default: [];
  };
}
const CatalogueSchema = new Schema<CatalogueDocument>(
  {
    name: { type: String, default: "" },
    workspaceId: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    isDefault: { type: Boolean, default: false },
    images: {
      type: [
        {
          url: { type: String, default: "" },
          name: { type: String, default: "" },
        },
      ],
      default: [],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
export default models.Catalogue ||
  model<CatalogueDocument>("Catalogue", CatalogueSchema);
