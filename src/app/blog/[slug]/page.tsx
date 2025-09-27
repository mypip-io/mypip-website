import { getBlogPostBySlug, getImageUrl } from '@/lib/sanity-queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | MyPip Blog',
    }
  }

  return {
    title: post.seoTitle || `${post.title} | MyPip Blog`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'Anonymous'],
      images: post.mainImage ? [
        {
          url: getImageUrl(post.mainImage, 1200, 630) || '',
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [getImageUrl(post.mainImage, 1200, 630) || ''] : [],
    },
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={getImageUrl(value, 800, 400) || ''}
          alt={value.alt || 'Blog image'}
          width={800}
          height={400}
          className="w-full h-auto rounded-lg border-2 border-dashed border-gray-300"
        />
        {value.alt && (
          <p className="text-sm text-gray-600 italic mt-2 text-center">
            {value.alt}
          </p>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mb-4 mt-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mb-3 mt-5">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-yellow-400 pl-4 my-6 italic bg-yellow-50 py-2">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        className="text-blue-600 hover:text-blue-800 underline"
        target={value.href.startsWith('http') ? '_blank' : '_self'}
        rel={value.href.startsWith('http') ? 'noopener noreferrer' : ''}
      >
        {children}
      </a>
    ),
  },
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-yellow-50 text-gray-800">
      <article className="px-6 py-16 max-w-4xl mx-auto">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-block border-2 border-dashed border-gray-400 px-4 py-2 bg-yellow-200 hover:bg-yellow-300 transform hover:-rotate-1 transition-all text-sm"
          >
            ← Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="border-2 border-dashed border-gray-300 p-8 bg-yellow-100 transform rotate-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <time className="text-gray-600 italic">
                  Published on {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <p className="text-gray-700">by {post.author?.name || 'Anonymous'}</p>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-gray-200 px-3 py-1 text-sm rounded transform hover:rotate-1 transition-transform"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* Main Image */}
        {post.mainImage && (
          <div className="mb-12">
            <div className="border-2 border-dashed border-gray-300 p-4 bg-white transform -rotate-1">
              <Image
                src={getImageUrl(post.mainImage, 1200, 600) || ''}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-auto rounded"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="border-2 border-dashed border-gray-300 p-8 bg-white">
            <PortableText
              value={post.content}
              components={portableTextComponents}
            />
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-400 p-6 bg-yellow-200 transform rotate-1 inline-block">
              <h3 className="text-xl font-bold mb-3">Enjoyed this article?</h3>
              <p className="text-gray-700 mb-4">
                Get more insights on sales development and lead generation.
              </p>
              <Link
                href="/#hero"
                className="bg-blue-900 text-white px-6 py-3 font-semibold hover:bg-blue-800 transform hover:rotate-1 transition-all inline-block"
              >
                Get Started with MyPip
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  )
}