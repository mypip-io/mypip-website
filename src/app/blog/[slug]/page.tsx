import { sanityClient } from '@/sanity/config'
import { BlogPost } from '@/types'
import { notFound } from 'next/navigation'
import EmailCapture from '@/components/EmailCapture'
import HandwrittenAnnotation from '@/components/HandwrittenAnnotation'
import PostItNote from '@/components/PostItNote'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      tags,
      metaDescription,
      featuredImage {
        asset->{
          _ref,
          _type
        },
        alt
      }
    }
  `

  try {
    return await sanityClient.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found - MyPip Blog',
    }
  }

  return {
    title: `${post.title} - MyPip Blog`,
    description: post.metaDescription || post.excerpt || 'Read the latest from MyPip',
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <article className="max-w-3xl mx-auto">
        <div className="relative mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-between text-sm text-ink-blue/60 mb-8">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>

            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="handwritten bg-postit-yellow px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <HandwrittenAnnotation position="top-right" className="hidden md:block">
            Great read!
          </HandwrittenAnnotation>
        </div>

        {post.featuredImage && (
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg mb-12"></div>
        )}

        <div className="prose prose-lg max-w-none">
          {/* This would be where Sanity's PortableText component would render the content */}
          <div className="dashed-border p-6 bg-notebook-cream/30">
            <p className="handwritten text-center text-ink-blue/60">
              Blog post content would be rendered here using Sanity's PortableText component
            </p>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-16 text-center">
          <PostItNote rotation={-1} color="green" className="inline-block mb-8">
            <div className="text-center">
              <div className="font-bold mb-2">Liked this post?</div>
              <div className="text-sm">Get more sales insights in your inbox</div>
            </div>
          </PostItNote>

          <EmailCapture
            source="blog"
            placeholder="your.email@company.com"
            buttonText="Subscribe to Newsletter"
            className="max-w-lg mx-auto"
          />
        </div>
      </article>
    </main>
  )
}