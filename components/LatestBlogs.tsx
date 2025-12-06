import Link from "next/link";
import Image from "next/image";
import pool from "@/lib/db";
import { ArrowRight, Calendar } from "lucide-react";

export default async function LatestBlogs() {
  let latestPosts = [];

  try {
    const query = `
      SELECT id, title, slug, image_url, created_at, 
      LEFT(content, 80) as excerpt 
      FROM posts 
      ORDER BY created_at DESC 
      LIMIT 3
    `;
    const result = await pool.query(query);
    latestPosts = result.rows;
  } catch (error) {
    console.error("Failed to load latest blogs:", error);
  }

  if (latestPosts.length === 0) return null;

  return (
    <section className="  py-14 md:py-16 bg-[#F7F8FD] font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* CENTERED HEADING */}
        <div className="text-center mb-10">
          <span className="text-[#ff914d] font-bold tracking-wider uppercase text-xs mb-2 block">
            Our Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#001341]">
            Latest News
          </h2>
        </div>

        {/* SLIDER CONTAINER 
            - Mobile: flex, overflow-x-auto, snap-x (Creates the slider)
            - Desktop: md:grid, md:grid-cols-3 (Switches back to grid)
        */}
        <div className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 
            md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0
            scrollbar-hide
        ">
          {latestPosts.map((post: any) => (
            <div 
              key={post.id} 
              className="
                min-w-[85vw] snap-center 
                md:min-w-0 md:snap-align-none
                bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300 group h-full
              "
            >
              {/* Image */}
              <div className="h-52 relative overflow-hidden bg-gray-200">
                {post.image_url ? (
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
                
                {/* Date Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-bold text-[#001341] shadow-sm flex items-center gap-1.5">
                    <Calendar size={10} className="text-[#ff914d]" />
                    {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-[#001341] mb-2 line-clamp-2 leading-tight group-hover:text-[#ff914d] transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                  {post.excerpt}...
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="mt-auto inline-flex items-center gap-2 text-[#001341] font-bold text-sm group-hover:gap-3 transition-all"
                >
                  Read More <ArrowRight size={16} className="text-[#ff914d]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-8 md:mt-12">
            <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 bg-[#ff914d] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#e07b39] transition-all shadow-md hover:shadow-lg"
            >
                View All Blogs <ArrowRight size={18} />
            </Link>
        </div>

      </div>
    </section>
  );
}