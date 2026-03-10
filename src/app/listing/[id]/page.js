import connectDB from "@/lib/mongodb";
import Listing from "@/models/Listing";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ListingDetail({ params }) {
  await connectDB();
  
  // Params await kirima Next.js 15+ wala aniwaaryaya wei
  const { id } = await params;

  let item;
  try {
    item = await Listing.findById(id);
  } catch (error) {
    return notFound();
  }

  if (!item) return notFound();

  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen bg-white">
      {/* Back Button */}
      <Link href="/" className="text-blue-600 mb-6 inline-flex items-center hover:underline font-medium transition">
        <span className="mr-2">←</span> Back to Feed
      </Link>
      
      <div className="rounded-3xl shadow-2xl overflow-hidden border border-gray-100 bg-white">
        {/* Image Section - Optimized with Tailwind standard class h-100 */}
        <div className="relative w-full h-100">
          <Image 
            src={item.imageUrl} 
            alt={item.title} 
            fill 
            className="object-cover"
            priority 
          />
        </div>
        
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs px-3 py-1 bg-blue-50 rounded-full">
                {item.location}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 mt-3">{item.title}</h1>
            </div>
            {/* Standard min-w-35 used instead of arbitrary value */}
            <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-lg text-center min-w-35">
              <p className="text-blue-100 text-xs font-bold uppercase mb-1">Price per person</p>
              <p className="text-3xl font-black">${item.price || "Free"}</p>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full my-8" />
          
          <div className="prose max-w-none">
            {/* Escaped the single quote to fix react/no-unescaped-entities */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">What you&apos;ll do</h3>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
              {item.description}
            </p>
          </div>

          {/* Host Info & Action */}
          <div className="mt-12 bg-gray-50 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
                {item.creatorName.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Experience Host</p>
                <p className="text-xl font-bold text-gray-900">{item.creatorName}</p>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 transform hover:-translate-y-1">
              Book this Experience
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}