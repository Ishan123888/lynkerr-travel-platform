import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb"; // {} අයින් කරලා නම connectDB කියලා දාන්න
import Listing from "@/models/Listing";

export async function POST(req) {
  try {
    await connectDB(); // මෙතනත් නම connectDB() ලෙස වෙනස් කරන්න
    const data = await req.json();
    const newListing = await Listing.create(data);

    return NextResponse.json(
      { message: "Listing created successfully", data: newListing },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: "Failed to create listing", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB(); // මෙතනත් connectDB() කරන්න
    const listings = await Listing.find({}).sort({ createdAt: -1 });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}