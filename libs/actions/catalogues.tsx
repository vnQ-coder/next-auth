"use server";
import { dbConnection } from "@/database";
import Catalogue from "@/models/Catalogue";
import {
  InternalServerErrorResponse,
  NotFoundResponse,
  OKResponse,
} from "../helper";
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
  var catalogues = [];
  if (query) {
    catalogues = await Catalogue.find({ name: new RegExp(query, "i") });
  } else {
  }
};
export const createCatalogues = async (name: string) => {
  try {
  } catch (err) {}
};
