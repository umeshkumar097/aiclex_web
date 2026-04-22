import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import pool from "@/lib/db"; 
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
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

  const description = post.meta_description || post.content.replace(/<[^>]*>/g, '').substring(0, 160);

  return {
    title: `${post.title} | AICLEX Blog`,
    description: description,
    alternates: {
      canonical: `https://aiclex.in/${slug}`,
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

  // Estimate reading time
  const wordCount = post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 220));

  // Process Content for ToC
  const rawContent = post.content || '';
  const processedContent = addHeadingIds(rawContent);
  const headings = extractHeadings(rawContent);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image_url,
    "datePublished": new Date(post.created_at).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "AICLEX Technologies",
      "url": "https://aiclex.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AICLEX Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aiclex.in/logo.png"
      }
    },
    "description": post.meta_description || post.content.replace(/<[^>]*>/g, '').substring(0, 160)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full bg-white font-sans mt-16 md:mt-20">

        {/* ===================== HERO BANNER ===================== */}
        <div className="bg-gradient-to-br from-[#001341] via-[#0a1f5e] to-[#001341] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-6 md:mb-8 transition-colors text-sm font-bold"
            >
              <ArrowLeft size={16} />
              Back to All Posts
            </Link>

            {/* Date + reading time */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-2 text-[#ff914d] text-[10px] sm:text-xs font-black uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-3 py-1 md:px-4 md:py-1.5 rounded-full">
                <Calendar size={12} />
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="inline-flex items-center gap-2 text-blue-300 text-[10px] sm:text-xs font-bold bg-white/5 border border-white/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full">
                <Clock size={12} />
                {readingTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white mb-8">
              {post.title}
            </h1>

            {/* Author row */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5271ff] to-[#ff914d] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                A
              </div>
              <div>
                <p className="font-bold text-white text-sm">AICLEX Technologies</p>
                <p className="text-blue-300 text-xs">Official Blog · Greater Noida, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== FEATURED IMAGE ===================== */}
        {post.image_url && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-20 relative z-20">
            <div className="relative w-full aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-white">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                quality={100}
                priority
                className="object-cover object-center"
              />
            </div>
          </div>
        )}

        {/* ===================== CONTENT + SIDEBAR ===================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col xl:flex-row gap-10 xl:gap-14">

            {/* -------- MAIN ARTICLE -------- */}
            <article className="w-full xl:max-w-3xl min-w-0">
              {/* Mobile ToC - collapsible, shown only on mobile */}
              {headings.length > 0 && (
                <div className="xl:hidden mb-8 bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <p className="text-xs font-black text-[#001341] uppercase tracking-widest mb-3 flex items-center gap-2">
                    📋 Table of Contents
                  </p>
                  <nav className="space-y-1.5">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block text-sm font-semibold text-[#5271ff] hover:underline py-0.5 ${heading.level === 3 ? "pl-4 text-gray-500" : ""}`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Blog content */}
              <div
                className="
                  prose prose-base md:prose-lg max-w-none
                  prose-headings:font-black prose-headings:text-[#001341] prose-headings:tracking-tight prose-headings:leading-tight
                  prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-600 prose-p:leading-[1.85] prose-p:text-base md:prose-p:text-[17px]
                  prose-a:text-[#5271ff] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[#001341] prose-strong:font-black
                  prose-li:text-gray-600 prose-li:leading-relaxed
                  prose-ul:my-4 prose-ol:my-4
                  prose-img:rounded-2xl prose-img:shadow-lg prose-img:w-full
                  prose-blockquote:border-l-4 prose-blockquote:border-[#5271ff] prose-blockquote:bg-blue-50/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic
                  prose-code:bg-gray-100 prose-code:text-[#5271ff] prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-bold prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-[#001341] prose-pre:text-blue-200 prose-pre:rounded-2xl prose-pre:shadow-xl
                  prose-table:border prose-table:border-gray-200 prose-table:rounded-xl prose-table:overflow-hidden
                  prose-th:bg-[#001341] prose-th:text-white prose-th:font-bold prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-gray-100
                  break-words overflow-wrap-anywhere
                "
                dangerouslySetInnerHTML={{ __html: processedContent || '<p class="text-gray-400">No content available for this post.</p>' }}
              />

              {/* Internal Linking CTA for Zoom */}
              <div className="mt-12 p-8 bg-blue-50 rounded-3xl border border-blue-100 text-center">
                <p className="text-lg font-black text-[#001341] mb-4">Need Official Zoom Licenses in India?</p>
                <Link 
                  href="/zoom"
                  className="inline-block bg-[#5271ff] hover:bg-[#001341] text-white px-8 py-4 rounded-2xl font-black text-sm transition-all hover:scale-105 shadow-xl shadow-blue-200"
                >
                  Buy Zoom License in India, AICLEX Official Zoom Reseller
                </Link>
              </div>

              {/* Share bar */}
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 font-bold text-sm flex-shrink-0">
                  <Share2 size={16} />
                  Share this article
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - https://aiclex.in/' + slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-600 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://aiclex.in/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0077b5] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://aiclex.in/${slug}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all"
                  >
                    𝕏 Twitter
                  </a>
                </div>
              </div>
            </article>

            {/* -------- SIDEBAR (desktop only) -------- */}
            <aside className="hidden xl:block xl:w-[300px] flex-shrink-0">
              <div className="sticky top-28 space-y-6">
                <TableOfContents headings={headings} />

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-[#001341] to-[#0a2066] text-white rounded-[1.5rem] p-6 shadow-xl">
                  <p className="text-xs font-black uppercase tracking-widest text-[#ff914d] mb-3">Free Consultation</p>
                  <p className="text-lg font-black leading-tight mb-3">Need Zoom Licenses or a CRM?</p>
                  <p className="text-blue-200 text-sm leading-relaxed mb-5">Talk to our team — we'll recommend the right solution for your business. No obligation.</p>
                  <a
                    href="https://wa.me/918449488090?text=Hi%20AICLEX%2C%20I%20read%20your%20blog%20and%20want%20to%20know%20more."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#ff914d] hover:bg-orange-500 text-white text-center py-3 rounded-xl font-black text-sm transition-all hover:scale-105"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            </aside>

          </div>

          {/* ===================== RELATED BLOGS ===================== */}
          <RelatedBlogs posts={relatedPosts} />
        </div>
      </div>

      {post.show_popup !== false && <BlogLeadPopup />}
    </>
  );
}