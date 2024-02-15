export const NotFoundResponse = () => ({
  code: 404,
  message: "not found",
  data: [],
});
export const InternalServerErrorResponse = () => ({
  code: 500,
  message: "Internal Server Error",
});
export const OKResponse = (data: any) => ({
  code: 200,
  message: "Ok",
  data,
});
