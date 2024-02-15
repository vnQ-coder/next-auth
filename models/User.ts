import * as mongoose from "mongoose";
import crypto from "crypto";

const { Schema, model } = mongoose;

interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  type: "individual" | "agency";
  email: string;
  salt: string;
  password: string;
  picture: string;
  suspended: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  isMember: boolean;
  loginCount: number;
  userLoginType: {
    web: boolean;
    mobile: boolean;
  };
  role: string;
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
}

const UserSchema = new Schema<UserDocument>(
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

UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.validatePassword = function (password: string) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.password === hash;
};

UserSchema.methods.toProfile = function () {
  return {
    id: this._id,
    type: this.type,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    picture: this.picture,
    isVerified: this.isVerified,
    role: this.role,
    isMember: this.isMember,
    suspended: this.suspended,
  };
};

const User = mongoose.models.User || model<UserDocument>("User", UserSchema);

export default User;
