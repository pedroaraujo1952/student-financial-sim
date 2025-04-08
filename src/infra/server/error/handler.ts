// const normalizeError = (err) => {
//   if (err instanceof BaseError) {
//     return err
//   }

//   return new InternalServerError(err)
// }

export const errorHandler = (err, req, res, next) => {
  // if (res.headersSent) {
  //   return next(err)
  // }
  // const error = normalizeError(err)
  // const statusCode = error.statusCode
  // const body = error.getBody()
  console.log(err);
  res.status(500).json({ message: "Internal Server Error" });
};
