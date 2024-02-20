import { dbConnection } from "@/database";
import TemplateFrame from "@/models/TemplateFrame";
import {
  InternalServerErrorResponse,
  NotFoundResponse,
  OKResponse,
} from "../helper";
dbConnection();
export const getTemplateFrames = async (object: {
  categoryId: string;
  subCategoryId: string;
}) => {
  try {
    const { categoryId, subCategoryId } = object;
    var templateFrames: any = null;
    templateFrames = await TemplateFrame.find({ categoryId, subCategoryId });
    if (templateFrames && templateFrames.length > 0) {
      return OKResponse(templateFrames);
    } else return NotFoundResponse();
  } catch (err) {
    return InternalServerErrorResponse();
  }
};
