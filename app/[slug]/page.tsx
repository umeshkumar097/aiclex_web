import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image"; // ✅ Import Next.js Image
import pool from "@/lib/db"; 
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";
import BlogLeadPopup from "@/components/BlogLeadPopup";
import TableOfContents from "@/components/TableOfContents";
import RelatedBlogs from "@/components/RelatedBlogs";
import { addHeadingIds, extractHeadings } from "@/lib/blog-utils";

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

// ✅ Generate Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await pool.query('SELECT title, content, image_url, meta_description FROM posts WHERE slug = $1', [slug]);
  const post = result.rows[0];
  
  if (!post) return { title: "Blog Post Not Found" };

  // Use manual meta_description or fallback to content excerpt
  const description = post.meta_description || post.content.replace(/<[^>]*>/g, '').substring(0, 160);

  return {
    title: `${post.title} | AICLEX Blog`,
    description: description,
    alternates: {
      canonical: `https://www.aiclex.in/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: description,
      images: post.image_url ? [{ url: post.image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: post.image_url ? [post.image_url] : [],
    }
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params; 

  let post = null;
  let relatedPosts = [];

  try {
    const query = 'SELECT * FROM posts WHERE slug = $1';
    const result = await pool.query(query, [slug]);
    
    if (result.rows.length > 0) {
      post = result.rows[0];
      
      // Fetch Related Posts (Top 3 most recent excluding current)
      const relatedQuery = `
        SELECT id, title, slug, image_url, created_at 
        FROM posts 
        WHERE id != $1 
        ORDER BY created_at DESC 
        LIMIT 3
      `;
      const relatedResult = await pool.query(relatedQuery, [post.id]);
      relatedPosts = relatedResult.rows;
    }
  } catch (error) {
    console.error("Database Error:", error);
  }

  if (!post) {
    return notFound();
  }

  // ✅ Process Content for ToC
  const rawContent = post.content || '';
  const processedContent = addHeadingIds(rawContent);
  const headings = extractHeadings(rawContent);

  // JSON-LD structured data for better indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image_url,
    "datePublished": new Date(post.created_at).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "AICLEX"
    },
    "description": post.meta_description || post.content.replace(/<[^>]*>/g, '').substring(0, 160)
  };

  return (
    <article className="max-w-7xl mx-auto py-12 md:py-20 px-4 sm:px-6 font-sans mt-10 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto">
          <FadeInOnScroll direction="right">
              <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff914d] mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
                <ArrowLeft size={16} /> Back to All Posts
              </Link>
          </FadeInOnScroll>

          <FadeInOnScroll>
              <header className="mb-10 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-[#ff914d] text-[10px] sm:text-xs mb-4 font-black uppercase tracking-widest bg-orange-50 w-fit px-4 py-1 rounded-full mx-auto md:mx-0">
                  <Calendar size={14} />
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#001341] leading-[1.1] mb-6 tracking-tight">
                  {post.title}
                </h1>
              </header>
          </FadeInOnScroll>

          {/* ✅ Optimized Image */}
          {post.image_url && (
            <FadeInOnScroll delay={0.2}>
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl border border-gray-100 bg-gray-100 group">
                  <Image 
                    src={post.image_url} 
                    alt={post.title} 
                    fill
                    quality={100}
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
            </FadeInOnScroll>
          )}
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mt-12">
        {/* Main Content Area */}
        <div className="lg:w-2/3">
          <div 
            className="max-w-none prose prose-base sm:prose-lg prose-blue prose-img:rounded-3xl prose-headings:text-[#001341] prose-headings:font-black prose-headings:tracking-tight prose-a:text-[#5271ff] prose-a:font-bold prose-strong:text-[#001341] prose-p:leading-relaxed prose-p:text-gray-600 prose-p:text-justify break-words hyphens-auto transition-opacity duration-300"
            dangerouslySetInnerHTML={{ __html: processedContent || '<p class="text-gray-400">No content available for this post.</p>' }}
          />
        </div>

        {/* Sidebar / ToC */}
        <aside className="lg:w-1/3">
           <TableOfContents headings={headings} />
        </aside>
      </div>

      {/* Related Blogs Section */}
      <RelatedBlogs posts={relatedPosts} />

      {post.show_popup !== false && <BlogLeadPopup />}
    </article>
  );
}