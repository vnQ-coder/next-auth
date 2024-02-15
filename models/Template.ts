import { models, model, Document, Schema } from "mongoose";
type TextItem = {
  id: string;
  textId: string;
  text: string;
  fontSize: string;
  color: string;
  fontFamily: string;
  fontWeight: string;
  textDecoration: string;
  fontStyle: string;
  x: number;
  y: number;
  width: number;
  rotation?: number;
};

type ImageItem = {
  id: string;
  src: string;
  url: string;
  x: number;
  y: number;
  height: number;
  width: number;
  type?: string;
};

type BackItem = {
  src: string;
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
};

type DisplayItem = {
  id: string;
  src: string;
  x: number;
  y: number;
  height: number;
  width: number;
  rotation?: number;
};

type PreviewItem = {
  id: string;
  src: string;
  x: number;
  y: number;
  height: number;
  width: number;
  rotation?: number;
};

type FrameId = {
  type: Schema.Types.ObjectId;
  ref: string;
};

interface TemplateDocument extends Document {
  text: TextItem[];
  image: ImageItem[];
  height: string;
  width: string;
  back: BackItem[];
  display: DisplayItem[];
  preview: PreviewItem;
  frameId: FrameId;
  name: string;
  canColor: string;
  userId: string;
  workspaceId: string;
}
const TemplateSchema = new Schema<TemplateDocument>(
  {
    text: [
      {
        id: String,
        textId: String,
        text: String,
        fontSize: String,
        color: String,
        fontFamily: String,
        fontWeight: String,
        textDecoration: String,
        fontStyle: String,
        x: Number,
        y: Number,
        width: Number,
        rotation: { type: Number, default: 0 },
      },
    ],
    image: [
      {
        id: String,
        src: String,
        url: String,
        x: Number,
        y: Number,
        height: Number,
        width: Number,
        type: { type: String, default: "logo" },
      },
    ],
    height: String,
    width: String,
    back: [
      {
        src: String,
        id: String,
        x: Number,
        y: Number,
        height: Number,
        width: Number,
      },
    ],
    display: [
      {
        id: String,
        src: String,
        x: Number,
        y: Number,
        height: Number,
        width: Number,
        rotation: { type: Number, default: 0 },
      },
    ],
    preview: {
      id: String,
      src: String,
      x: Number,
      y: Number,
      height: Number,
      width: Number,
      rotation: { type: Number, default: 0 },
    },
    frameId: {
      type: Schema.Types.ObjectId,
      ref: "TemplateFrame",
    },
    name: { type: String, default: "" },
    canColor: String,
    userId: String,
    workspaceId: { type: String, default: "" },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);
export default models.Template ||
  model<TemplateDocument>("Template", TemplateSchema);
