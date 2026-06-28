import mongoose, { Schema, models, model } from "mongoose";

export interface IOrderItem {
  projectId: string;
  title: string;
  price: number;
  image: string;
}

export interface IBillingDetails {
  fullName: string;
  email: string;
  phone: string;
}

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  billingDetails: IBillingDetails;
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: "stripe" | "paypal" | "razorpay";
  paymentDetails: {
    cardNumber?: string;
    upiId?: string;
    paypalEmail?: string;
  };
  status: "completed" | "pending" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  projectId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const BillingDetailsSchema = new Schema<IBillingDetails>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    billingDetails: { type: BillingDetailsSchema, required: true },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["stripe", "paypal", "razorpay"],
      required: true,
    },
    paymentDetails: {
      cardNumber: String,
      upiId: String,
      paypalEmail: String,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "completed",
    },
  },
  { timestamps: true }
);

const Order = models.Order || model<IOrder>("Order", OrderSchema);

export default Order;
