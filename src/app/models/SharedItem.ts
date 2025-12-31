import { Schema, model, models } from "mongoose";

const SharedItemSchema = new Schema(
  {
    title: String,
    description: String,

    content_type: {
      type: String,
      index: true,
    },

    is_featured: {
      type: Boolean,
      default: false,
    },

    magic_key: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default models.SharedItem || model("SharedItem", SharedItemSchema);
