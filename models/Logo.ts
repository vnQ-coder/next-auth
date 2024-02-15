import { Document, model, models, Schema } from "mongoose";
interface LogoDocument extends Document {
  url: string;
  workspaceId: string;
}
const LogoSchema = new Schema<LogoDocument>({
  url: {
    type: String,
    default: "",
  },
  workspaceId: {
    type: String,
    default: "",
  },
});
export default models.Logo || model<LogoDocument>("Logo", LogoSchema);
