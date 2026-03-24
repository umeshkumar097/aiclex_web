import Image from "next/image";
import Link from "next/link";
import pool from "@/lib/db";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import BlogLeadPopup from "@/components/BlogLeadPopup";

export const metadata: Metadata = {
  title: "Latest News & Insights | AICLEX Blog",
  description: "Explore the latest updates, tech tutorials, and insights from the AICLEX team.",
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const postsPerPage = 6;
  const offset = (currentPage - 1) * postsPerPage;

  let posts = [];
  let totalPosts = 0;

  try {
    const query = `
      SELECT id, title, slug, content, image_url, created_at
      FROM posts 
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [postsPerPage, offset]);
    posts = result.rows;

    const countResult = await pool.query('SELECT COUNT(*) FROM posts');
    totalPosts = parseInt(countResult.rows[0].count);

  } catch (error) {
    console.error("Database Error:", error);
  }

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <section className="w-full mt-10 py-20 px-4 sm:px-6 lg:px-8 font-sans min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#ff914d] font-bold tracking-wider uppercase text-sm mb-3 block">
            Our Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#001341] mb-6">
            Latest News & Insights
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post: any) => {
            // Strip HTML for excerpt
            const cleanExcerpt = post.content
              ? post.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').substring(0, 150)
              : "";

            return (
              <article 
                key={post.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                {/* Image */}
                <div className="h-48 relative overflow-hidden bg-gray-200">
                  {post.image_url ? (
                    <Image 
                      src={post.image_url} 
                      alt={post.title} 
                      fill
                      quality={100}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform backface-hidden"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                      No Image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar size={14} />
                    <time dateTime={new Date(post.created_at).toISOString()}>
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#001341] mb-3 line-clamp-2">
                    <Link href={`/${post.slug}`} className="hover:text-[#5271ff] transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                    {cleanExcerpt}...
                  </p>

                  <Link 
                    href={`/${post.slug}`} 
                    aria-label={`Read more about ${post.title}`}
                    className="inline-flex items-center gap-2 text-[#5271ff] font-bold text-sm hover:text-[#001341] transition-colors mt-auto"
                  >
                    Read More <span className="sr-only">about {post.title}</span> <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
            <div className="text-center py-10 text-gray-500">
                No posts found on this page.
            </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            {currentPage > 1 ? (
              <Link 
                href={`/blog?page=${currentPage - 1}`}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-gray-200 text-[#001341] font-bold hover:bg-[#001341] hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft size={20} /> Previous
              </Link>
            ) : (
              <span className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed">
                <ChevronLeft size={20} /> Previous
              </span>
            )}

            <div className="hidden sm:flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`/blog?page=${pageNum}`}
                  className={`
                    w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all
                    ${pageNum === currentPage 
                      ? "bg-[#ff914d] text-white shadow-md transform scale-110" 
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}
                  `}
                >
                  {pageNum}
                </Link>
              ))}
            </div>

            {currentPage < totalPages ? (
              <Link 
                href={`/blog?page=${currentPage + 1}`}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-gray-200 text-[#001341] font-bold hover:bg-[#001341] hover:text-white transition-all shadow-sm"
              >
                Next <ChevronRight size={20} />
              </Link>
            ) : (
              <span className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed">
                Next <ChevronRight size={20} />
              </span>
            )}
          </div>
        )}

      </div>
    </section>
  );
}