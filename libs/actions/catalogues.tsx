"use server";
import { dbConnection } from "@/database";
import Catalogue from "@/models/Catalogue";
import {
  AlreadyExistsResponse,
  CreatedResponse,
  FailedToCreateResponse,
  FailedToUploadResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  OKResponse,
} from "../helper";
import { S3FileUploader } from "@/utils/awsHelper";
dbConnection();
export const getCatalogues = async () => {
  try {
    var catalogues = await Catalogue.find({});
    if (catalogues && catalogues.length > 0) {
      return OKResponse(catalogues);
    } else {
      return NotFoundResponse();
    }
  } catch (err) {
    return InternalServerErrorResponse();
  }
};
export const getCataloguesByQuery = async (query: string) => {
  try {
    var catalogues = [];
    if (query) {
      catalogues = await Catalogue.find({ name: new RegExp(query, "i") });
      if (catalogues && catalogues.length > 0) {
        return OKResponse(catalogues);
      } else {
        return NotFoundResponse();
      }
    } else {
      return NotFoundResponse();
    }
  } catch (err) {
    return InternalServerErrorResponse();
  }
};
export const createCatalogue = async (object: {
  name: string;
  subName: string;
  image: File;
}) => {
  try {
    const { name, subName, image } = object;
    var catalogue: any = null;
    catalogue = await findCatalogueByName(name);
    if (catalogue) {
      console.log(catalogue, "catalogue");
      return AlreadyExistsResponse();
    } else {
      const uploadedUrl = await S3FileUploader(
        image,
        "workspaces/global/catalogue"
      );
      if (!uploadedUrl) return FailedToUploadResponse();
      const obj = {
        name: name.toLowerCase(),
        images: [{ name: subName.toLowerCase(), url: uploadedUrl }],
      };
      catalogue = await Catalogue.create(obj);
      if (catalogue) return CreatedResponse(catalogue);
      else return FailedToCreateResponse();
    }
  } catch (err) {
    return InternalServerErrorResponse();
  }
};
export const updateCatalogueName = async (object: {
  id: string;
  name: string;
}) => {
  try {
    var catalogue: any = null;
    const { id, name } = object;
    catalogue = await Catalogue.findOne({
      name: name?.trim().toLowerCase(),
      _id: { $ne: id },
    });
    if (catalogue) return AlreadyExistsResponse();
    catalogue = await Catalogue.findOne({ _id: id });
    if (!catalogue) return NotFoundResponse();
    catalogue.name = name;
    catalogue = await catalogue.save();
    return OKResponse(catalogue);
  } catch (err) {
    return InternalServerErrorResponse();
  }
};
export const deleteCatalogue = async (id: string) => {
  try {
    const catalogue = await Catalogue.findByIdAndDelete({ _id: id });
    if (!catalogue) return NotFoundResponse();
    return OKResponse(catalogue);
  } catch (err) {
    return InternalServerErrorResponse();
  }
};
export const createSubCatalogue = async (object: {
  id: string;
  name: string;
  image: File;
}) => {
  try {
    var catalogue: any = null;
    const { id, name, image } = object;
    catalogue = await Catalogue.findOne({ _id: id });
    if (!catalogue) return NotFoundResponse();
    catalogue = await Catalogue.findOne({
      _id: id,
      images: {
        $elemMatch: {
          name: name?.trim()?.toLowerCase(),
        },
      },
    });
    console.log(catalogue, "catalogue");
    if (catalogue) return AlreadyExistsResponse();
    const uploadedUrl = await S3FileUploader(
      image,
      "workspaces/global/catalogue"
    );
    if (!uploadedUrl) return FailedToUploadResponse();
    catalogue = await Catalogue.findOneAndUpdate(
      { _id: id },
      { $push: { images: { name: name.toLowerCase(), url: uploadedUrl } } },
      { new: true }
    );
    return CreatedResponse(catalogue);
  } catch (err) {
    console.log(err);
    return InternalServerErrorResponse();
  }
};
export const updateSubCatalogue = async (object: {
  id: string;
  subCatalogueId: string;
  name: string | undefined;
  image: File | undefined;
}) => {
  try {
    const { id, subCatalogueId, name, image } = object;
    var catalogue: any = null;
    catalogue = await Catalogue.findOne({
      _id: id,
      images: {
        $elemMatch: {
          _id: { $ne: subCatalogueId },
          name: name?.trim()?.toLowerCase(),
        },
      },
    });
    if (catalogue) return AlreadyExistsResponse();
    var uploadedUrl: any = null;
    if (image) {
      uploadedUrl = await S3FileUploader(image, "workspaces/global/catalogue");
      if (!uploadedUrl) return FailedToUploadResponse();
    }
    catalogue = await Catalogue.findOneAndUpdate(
      {
        _id: id,
        images: {
          $elemMatch: {
            _id: subCatalogueId,
          },
        },
      },
      {
        $set: {
          ...(name ? { "images.$.name": name } : {}),
          ...(uploadedUrl ? { "images.$.url": uploadedUrl } : {}),
        },
      },
      { new: true }
    );
    if (!catalogue) return NotFoundResponse();
    return OKResponse(catalogue);
  } catch (err) {
    console.log(err);
    return InternalServerErrorResponse();
  }
};
export const deleteSubCatalogue = async (object: {
  id: string;
  subCatalogueId: string;
}) => {
  try {
    const { id, subCatalogueId } = object;
    var catalogue: any = null;
    catalogue = await Catalogue.findOne({
      _id: id,
      images: {
        $elemMatch: { _id: subCatalogueId },
      },
    });
    if (!catalogue) return NotFoundResponse();
    catalogue = await Catalogue.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          images: { _id: subCatalogueId },
        },
      },
      { new: true }
    );
    console.log(catalogue);
    return OKResponse(catalogue);
  } catch (err) {
    console.log(err);
    return InternalServerErrorResponse();
  }
};
const findCatalogueByName = async (name: string) => {
  try {
    return await Catalogue.findOne({
      name: name?.trim().toLowerCase(),
      workspaceId: { $eq: "" },
    });
  } catch (err) {
    return null;
  }
};
