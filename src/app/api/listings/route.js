import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // ඔයාගේ mongodb connect කරන file එකේ path එක බලන්න
import Listing from "@/models/Listing"; // ඔයාගේ Model එකේ path එක

export async function POST(req) {
  try {
    // 1. Database එකට connect වීම
    await connectToDatabase();

    // 2. Frontend එකෙන් එවන data ටික ගන්න
    const data = await req.json();

    // 3. MongoDB එකේ අලුත් Listing එකක් create කිරීම
    const newListing = await Listing.create(data);

    // 4. සාර්ථක නම් 201 response එකක් යැවීම
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

// Listing ඔක්කොම ගන්න GET method එකත් මෙතනම ලියන්න පුළුවන්
export async function GET() {
  try {
    await connectToDatabase();
    const listings = await Listing.find({}).sort({ createdAt: -1 });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}