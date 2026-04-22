import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

interface RelatedBlogsProps {
  posts: any[];
}

export default function RelatedBlogs({ posts }: RelatedBlogsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 md:mt-20 pt-14 border-t-2 border-gray-50">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10">
        <div>
          <span className="text-[#ff914d] font-black uppercase tracking-widest text-xs mb-2 block">
            Keep Reading
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#001341] tracking-tight leading-tight">
            Top Performing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5271ff] to-cyan-400">
              Blogs
            </span>
          </h2>
        </div>
        <Link
          href="/blog"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-[#001341] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          View All Insights <ArrowRight size={16} />
        </Link>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/${post.slug}`}
            className="group flex flex-col bg-white rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-[180px] sm:h-[200px] overflow-hidden bg-gray-100 flex-shrink-0">
              {post.image_url ? (
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#001341] to-[#5271ff]">
                  <span className="text-white text-4xl font-black opacity-20">A</span>
                </div>
              )}
              {/* Date badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-black text-[#001341] uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Calendar size={10} className="text-[#ff914d]" />
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-base font-black text-[#001341] leading-snug mb-4 line-clamp-2 group-hover:text-[#5271ff] transition-colors">
                {post.title}
              </h3>
              <div className="mt-auto flex items-center gap-2 text-[#5271ff] font-bold text-sm group-hover:gap-3 transition-all">
                Read Post <ArrowRight size={15} />
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-1 w-0 bg-gradient-to-r from-[#5271ff] to-[#ff914d] group-hover:w-full transition-all duration-500" />
          </Link>
        ))}
      </div>
    </section>
  );
}
