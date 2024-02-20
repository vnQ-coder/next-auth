import { dbConnection } from "@/database";
import Catalogue from "@/models/Catalogue";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { fileSizeResponseHelper, fileTypeResponseHelper } from "@/utils";
import { S3FileUploader } from "@/utils/awsHelper";
import { fromZodError, isValidationErrorLike } from "zod-validation-error";
import { getTemplatesByCategoryAndSubCategoryId } from "@/libs/actions/templates";

export async function GET(req: NextRequest) {
  try {
    console.log(req);
    const query = req.nextUrl.searchParams.get("query");
    await dbConnection();
    var catalogues = [];
    if (query) {
      catalogues = await Catalogue.find({ name: new RegExp(query, "i") });
    } else {
      catalogues = await Catalogue.find({});
    }
    if (catalogues && catalogues.length > 0) {
      return NextResponse.json({
        code: 200,
        message: "OK",
        data: catalogues,
        count: catalogues.length,
      });
    } else {
      return NextResponse.json({ code: 404, message: "Not Found" });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ code: 500, message: "Internal Server Error" });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     // console.log(req);
//     const formData = await req.formData();
//     console.log(formData);
//     const file = formData.get("file") as File;
//     console.log(file.type);
//     let response = null;
//     if (!file) {
//       return NextResponse.json({
//         code: 400,
//         message: "Image is required!",
//       });
//     }
//     response = fileTypeResponseHelper("image", file);
//     if (response) {
//       return NextResponse.json(response);
//     }
//     response = fileSizeResponseHelper(1, file);
//     if (response) {
//       return NextResponse.json(response);
//     }
//     // const bytes = await file.arrayBuffer();
//     // const buffer = Buffer.from(bytes);
//     // console.log(__dirname);
//     // const path = join(__dirname, "../../../../../public/", file.name);
//     // console.log(path, "path");
//     // await writeFile(path, buffer);
//     // console.log(buffer, "buffer");
//     // console.log(bytes, "bytes");
//     const result = await S3FileUploader(file);
//     console.log(result, "result");
//     return NextResponse.json({
//       code: 200,
//       message: "OK",
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ code: 500, message: "Internal Server Error" });
//   }
// }
// export async function POST(req: NextRequest) {
//   try {
//     // console.log(req);
//     // const { name } = await req.json();
//     const body = await req.json();

//     // if (!name) {
//     //   return NextResponse.json({
//     //     code: 400,
//     //     message: "Catalogue name is required!",
//     //   });
//     // }
//     const catalogue = z.object({
//       name: z.string(),
//     });
//     // console.log(body, "body");
//     const result = catalogue.parse(body);
//     // console.log(result.errors[0].path, "result");
//     return NextResponse.json({
//       code: 200,
//       message: "OK",
//     });
//   } catch (err) {
//     var validationError: any = "";
//     if (isValidationErrorLike(err)) {
//       validationError = fromZodError(err);
//       validationError = validationError?.toString();
//     }

//     return NextResponse.json({
//       code: 500,
//       message: validationError ? validationError : "Internal Server Error",
//     });
//   }
// }

export async function POST(req: NextRequest) {
  const formData: any = await req.formData();
  let obj = {
    categoryId: formData.get("categoryId"),
    subCategoryId: formData.get("subCategoryId"),
    // id: formData.get("id"),
    // name: formData.get("name"),
    // subCatalogueId: formData.get("subCatalogueId"),
    // subName: formData.get("subName"),
    // image: formData.get("image"),
  };
  return NextResponse.json(await getTemplatesByCategoryAndSubCategoryId(obj));
}
