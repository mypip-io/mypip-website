import { sanityClient } from '@/sanity/config'
import { BlogPost } from '@/types'
import Link from 'next/link'
import HandwrittenAnnotation from '@/components/HandwrittenAnnotation'
import PostItNote from '@/components/PostItNote'

async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      tags,
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
    return await sanityClient.fetch(query)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sales Insights & Founder Stories
          </h1>
          <p className="text-xl text-ink-blue/80 max-w-2xl">
            Real tactics, real results, real talk about building a sales pipeline that actually works.
          </p>

          <HandwrittenAnnotation position="top-right" className="hidden md:block">
            Fresh content weekly!
          </HandwrittenAnnotation>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <PostItNote rotation={-1} className="inline-block">
              <div className="text-center">
                <div className="text-xl font-bold mb-2">Blog posts coming soon!</div>
                <div className="text-sm">We're crafting some great content for you</div>
              </div>
            </PostItNote>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post._id} className="dashed-border p-6 bg-notebook-cream/50 hover:shadow-lg transition-shadow gentle-rotate">
                {post.featuredImage && (
                  <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                )}

                <h2 className="text-xl font-bold mb-3 hover:text-success-green transition-colors">
                  <Link href={`/blog/${post.slug.current}`}>
                    {post.title}
                  </Link>
                </h2>

                {post.excerpt && (
                  <p className="text-ink-blue/80 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-ink-blue/60">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="handwritten bg-postit-yellow px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter signup */}
        <div className="mt-16 text-center">
          <PostItNote rotation={1} color="blue" className="inline-block">
            <div className="text-center">
              <div className="font-bold mb-2">Never miss a post</div>
              <div className="text-sm">Join our newsletter for weekly sales tips</div>
            </div>
          </PostItNote>
        </div>
      </div>
    </main>
  )
}