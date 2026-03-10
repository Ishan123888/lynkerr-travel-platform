import connectDB from "@/lib/mongodb";
import Listing from "@/models/Listing";
import Link from "next/link";
import Image from "next/image"; // Image component eka import kala

export default async function Home() {
  await connectDB();
  
  // Newest to Oldest (Sorting)
  const listings = await Listing.find().sort({ createdAt: -1 });

  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="flex justify-between items-center mb-10 border-b pb-5">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">Lynkerr Travel</h1>
        <Link 
          href="/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md active:scale-95"
        >
          + Post Experience
        </Link>
      </header>

      {listings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No experiences shared yet. Be the first to inspire others!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item) => (
            <div key={item._id.toString()} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              {/* Optimized Image Container */}
              <div className="relative w-full h-52">
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-5 grow">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{item.location}</span>
                  <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                    ${item.price || "Free"}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold mt-2 text-gray-800 line-clamp-1">{item.title}</h2>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
                
                <div className="mt-5 pt-4 border-t border-gray-50 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Posted By</span>
                    <span className="text-xs font-medium text-gray-700">{item.creatorName}</span>
                  </div>
                  <Link 
                    href={`/listing/${item._id}`} 
                    className="text-blue-600 font-bold text-sm hover:text-blue-800 transition"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}