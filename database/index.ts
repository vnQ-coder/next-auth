import { connect } from "mongoose";

export async function dbConnection() {
  await connect(`${process.env.DB_URL}`);
}
