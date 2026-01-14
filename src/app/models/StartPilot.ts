import { Schema, model, models } from "mongoose";

const StartPilotSchema = new Schema(
  {
    email: { type: String, required: true, index: true },
    callingAgents: { type: Number, required: true },

    // Optional phone number (stored as pieces + a prebuilt e164 when available).
    phoneCountryCode: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    phoneE164: { type: String, default: "" },

    acceptedTerms: { type: Boolean, required: true },
    source: { type: String, default: "" },
    meta: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    // User asked to keep collection name as "Start Pilot"
    collection: "Start Pilot",
  }
);

export default models.StartPilot || model("StartPilot", StartPilotSchema);


