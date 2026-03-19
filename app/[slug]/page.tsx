import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image"; // ✅ Import Next.js Image
import pool from "@/lib/db"; 
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import FadeInOnScroll from "@/components/ui/FadeInOnScroll";

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

// ✅ Generate Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await pool.query('SELECT title, content, image_url FROM posts WHERE slug = $1', [slug]);
  const post = result.rows[0];
  
  if (!post) return { title: "Blog Post Not Found" };

  // Strip HTML for description
  const description = post.content.replace(/<[^>]*>/g, '').substring(0, 160);

  return {
    title: `${post.title} | AICLEX Blog`,
    description: description,
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
  try {
    const query = 'SELECT * FROM posts WHERE slug = $1';
    const result = await pool.query(query, [slug]);
    
    if (result.rows.length > 0) {
      post = result.rows[0];
    }
  } catch (error) {
    console.error("Database Error:", error);
  }

  if (!post) {
    return notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-20 px-6 font-sans mt-10">
      <FadeInOnScroll direction="right">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to All Posts
          </Link>
      </FadeInOnScroll>

      <FadeInOnScroll>
          <header className="mb-10 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-4 font-semibold uppercase tracking-wide">
              <Calendar size={16} />
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#001341] leading-tight mb-6">
              {post.title}
            </h1>
          </header>
      </FadeInOnScroll>

      {/* ✅ Optimized Image */}
      {post.image_url && (
        <FadeInOnScroll delay={0.2}>
            <div className="relative w-full h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden mb-12 shadow-2xl border border-gray-100 bg-gray-100">
              <Image 
                src={post.image_url} 
                alt={post.title} 
                fill
                quality={100}
                className="object-cover"
              />
            </div>
        </FadeInOnScroll>
      )}

      {/* Content Area with Horizontal Scroll for Tables */}
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div 
          className="max-w-none prose prose-lg md:prose-xl prose-blue prose-img:rounded-3xl prose-headings:text-[#001341] prose-a:text-blue-600 prose-strong:text-[#001341] transition-opacity duration-300"
          dangerouslySetInnerHTML={{ __html: post.content || '<p class="text-gray-400">No content available for this post.</p>' }}
        />
      </div>
    </article>
  );
}