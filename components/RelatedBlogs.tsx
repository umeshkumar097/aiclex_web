import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

interface RelatedBlogsProps {
  posts: any[];
}

export default function RelatedBlogs({ posts }: RelatedBlogsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-20 pt-20 border-t border-gray-100 pb-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <span className="text-[#ff914d] font-bold tracking-wider uppercase text-xs mb-2 block">
            Keep Reading
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#001341] tracking-tight">
            Top Forming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Blogs</span>
          </h2>
        </div>
        <Link 
            href="/blog" 
            className="px-8 py-3 bg-[#001341] text-white rounded-2xl font-bold hover:bg-blue-900 transition-all shadow-lg flex items-center gap-2"
        >
            View All Insights <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <FadeInOnScroll key={post.id} delay={index * 0.1}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300 group h-full">
              {/* Image */}
              <div className="h-48 relative overflow-hidden bg-gray-200">
                {post.image_url ? (
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">No Image</div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black text-[#001341] uppercase tracking-widest shadow-sm flex items-center gap-2">
                    <Calendar size={12} className="text-[#ff914d]" />
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#001341] mb-3 leading-tight group-hover:text-[#ff914d] transition-colors line-clamp-2">
                  <Link href={`/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <Link 
                  href={`/${post.slug}`} 
                  className="mt-auto inline-flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-3 transition-all"
                >
                  Read Post <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}
