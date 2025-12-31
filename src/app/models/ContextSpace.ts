import { model, models, Schema } from "mongoose";

const ContextSpaceSchema = new Schema(
  {
    documents: {
      type: [String],
      required: true,
      default: [],
    },

    magic_key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    about: {
      type: String,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    cover_image_url: {
      type: String,
    },

    uses: {
      type: Number,
      default: 0,
    },

    upvotes: {
      type: Number,
      default: 0,
    },

    downvotes: {
      type: Number,
      default: 0,
    },

    nodes_count: {
      type: Number,
      default: 0,
    },

    data_size: {
      type: Number, // bytes, KB, MB — your call, just be consistent
      default: 0,
    },

    categories: {
      type: [String],
      index: true,
      default: [],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt (you want this, trust me)
  }
);

export default models.ContextSpace || model("ContextSpace", ContextSpaceSchema);
