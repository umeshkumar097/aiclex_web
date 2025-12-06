import Link from "next/link";
import pool from "@/lib/db"; 
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// ✅ UPDATE: Type definition for Next.js 15+
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SingleBlogPage({ params }: Props) {
  // ✅ UPDATE: You must await params before using the slug
  const { slug } = await params; 

  let post = null;
  try {
    const query = 'SELECT * FROM posts WHERE slug = $1';
    
    // Now we use the resolved 'slug' variable
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
    <article className="max-w-4xl mx-auto py-20 px-6 font-sans">
      <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to All Posts
      </Link>

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

      {post.image_url && (
        <div className="w-full h-[400px] rounded-[2rem] overflow-hidden mb-12 shadow-2xl border border-gray-100">
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

     <div className="max-w-none prose prose-lg prose-blue prose-img:rounded-xl prose-headings:underline">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}