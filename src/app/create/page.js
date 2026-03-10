"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateListing() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      location: formData.get("location"),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl"),
      price: formData.get("price"),
      creatorName: "Ishan Ekanayaka", 
    };

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        const errData = await res.json();
        setError(errData.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission failed", err);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-6">
          <h1 className="text-2xl font-bold text-white">Share Your Experience</h1>
          <p className="text-blue-100 text-sm">Help others discover amazing places.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input name="title" placeholder="e.g. Scenic Hike in Ella" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
            <input name="location" placeholder="e.g. Badulla, Sri Lanka" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
            <input name="imageUrl" placeholder="Paste an image link from Unsplash" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
              <input name="price" type="number" placeholder="45" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea name="description" placeholder="Describe the magic of this place..." className="w-full border border-gray-200 p-3 rounded-xl h-32 focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>

          <div className="flex items-center gap-4 mt-2">
            {/* flex-grow was changed to grow to fix Tailwind suggestion */}
            <button 
              disabled={loading}
              className="grow bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-blue-300 active:scale-95"
            >
              {loading ? "Publishing..." : "Publish Listing"}
            </button>
            <Link href="/" className="text-gray-500 font-medium px-4 hover:text-gray-700 transition">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}