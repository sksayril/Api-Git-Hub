import mongoose, { Schema, models, model } from "mongoose";

export type SellerStatus = "pending" | "approved" | "rejected";

export interface ISeller {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  // KYC fields
  idProofNumber: string;
  idProofImage: string;   // S3 URL
  address: string;
  bankAccountNumber: string;
  bankAccountName: string;
  bankIFSC: string;
  bankPassbookImage: string; // S3 URL
  // Status
  status: SellerStatus;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SellerSchema = new Schema<ISeller>(
  {
    name:               { type: String, required: true, trim: true },
    email:              { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:           { type: String, required: true, minlength: 6 },
    idProofNumber:      { type: String, required: true, trim: true },
    idProofImage:       { type: String, required: true },
    address:            { type: String, required: true, trim: true },
    bankAccountNumber:  { type: String, required: true, trim: true },
    bankAccountName:    { type: String, required: true, trim: true },
    bankIFSC:           { type: String, required: true, trim: true },
    bankPassbookImage:  { type: String, required: true },
    status:             { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    verified:           { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Seller = models.Seller || model<ISeller>("Seller", SellerSchema);

export default Seller;
