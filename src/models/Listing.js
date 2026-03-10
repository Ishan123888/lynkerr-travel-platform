import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: String }, 
  creatorName: { type: String, default: "Ishan" }, // Auth daddi meka dynamic karamu
  createdAt: { type: Date, default: Date.now },
});

const Listing = mongoose.models.Listing || mongoose.model("Listing", ListingSchema);
export default Listing;