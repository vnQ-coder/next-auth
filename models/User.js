import * as mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    type: {
      type: String,
      enum: ["individual", "agency"],
    },
    email: { type: String, default: "" },
    salt: { type: String, default: "" },
    password: { type: String, default: "" },
    picture: { type: String, default: "" },
    suspended: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isMember: { type: Boolean, default: false },
    loginCount: { type: Number, default: 0 },
    userLoginType: {
      web: { type: Boolean, default: false },
      mobile: { type: Boolean, default: false },
    },
    role: { type: String, default: "" },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
