Lynkerr Travel Platform ✈️🌍
Lynkerr is a modern, full-stack travel experience sharing platform built with Next.js 15, MongoDB, and Tailwind CSS. It allows users to browse unique travel experiences and share their own adventures with the world.

🚀 Key Features
Public Experience Feed: A real-time dashboard showcasing travel stories from around the globe.

Dynamic Content: Each experience has its own dedicated page with high-quality images and detailed descriptions.

Optimized Performance: Fully leverages Next.js 15 features like next/image for performance and Server Components for SEO.

Clean UI/UX: Responsive design built with a focus on mobile-first accessibility.

🛠️ Tech Stack
Framework: Next.js 15 (App Router & Turbopack)

Database: MongoDB Atlas

Styling: Tailwind CSS

ODM: Mongoose

📂 Project Structure
Plaintext
src/
├── app/
│   ├── api/listings/    # Backend API handlers
│   ├── create/          # UI for posting new experiences
│   ├── listing/[id]/    # Dynamic routing for detailed views
│   └── page.js          # The main exploration feed
├── lib/                 # Database connection logic
└── models/              # Mongoose schemas (Listing model)
⚙️ How to Run Locally
1. Clone & Install
Bash
git clone <your-repository-url>
cd lynkerr-travel-platform
npm install
2. Configure Environment
Create a .env.local file in the root and add your MongoDB URI:

Code snippet
MONGODB_URI=mongodb+srv://admin:admin@cluster0.vy4ahho.mongodb.net/lynkerr?retryWrites=true&w=majority
3. Start Development
Bash
npm run dev
👤 Developer
Ishan Ekanayaka Third-year BSc (Hons) in Information Technology - SLIIT

