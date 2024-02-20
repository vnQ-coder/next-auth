export const NotFoundResponse = () => ({
  code: 404,
  message: "Data Not found.",
  data: [],
});

export const InternalServerErrorResponse = () => ({
  code: 500,
  message: "Internal Server Error.",
});

export const OKResponse = (data: any) => ({
  code: 200,
  message: "Ok",
  data,
});
export const AlreadyExistsResponse = () => ({
  code: 400,
  message: "Data Already Exists",
});
export const FailedToUploadResponse = () => ({
  code: 400,
  message: "Failed to Upload",
});
export const FailedToCreateResponse = () => ({
  code: 400,
  message: "Failed to Create",
});

export const CreatedResponse = (data: any) => ({
  code: 201,
  data,
  message: "Created",
});
