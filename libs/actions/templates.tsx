import { dbConnection } from "@/database";
import Template from "@/models/Template";
import {
  InternalServerErrorResponse,
  NotFoundResponse,
  OKResponse,
} from "../helper";
import TemplateFrame from "@/models/TemplateFrame";
dbConnection();
export const getTemplatesByCategoryAndSubCategoryId = async (object: {
  categoryId: string;
  subCategoryId: string;
}) => {
  try {
    const { categoryId, subCategoryId } = object;
    const frames = await TemplateFrame.find({
      categoryId,
      subCategoryId,
    }).select("id");
    if (frames && frames.length > 0) {
      const templates = await Template.find({
        frameId: { $in: frames.map((frame) => frame.id) },
      }).populate({
        path: "frameId",
        select: "id fullImageUrl height width type name",
      });
      const newArr = templates.map((template) => {
        return {
          ...template.toObject(),
          id: template.id,
          frameId: template.frameId.id,
          fullImageUrl: template.frameId.fullImageUrl,
          height: template.frameId.height,
          width: template.frameId.width,
          name: template.name,
          type: template.frameId.type,
        };
      });
      return OKResponse(newArr);
    } else return NotFoundResponse();
  } catch (err) {
    return InternalServerErrorResponse();
  }
};
