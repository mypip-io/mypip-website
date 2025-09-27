import { getAllBlogPosts, getImageUrl } from '@/lib/sanity-queries'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <main className="min-h-screen bg-yellow-50 text-gray-800">
      {/* Header */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            MyPip Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights on sales development, lead generation, and building sustainable growth pipelines.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="px-6 pb-16 max-w-4xl mx-auto">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="border-2 border-dashed border-gray-300 p-8 bg-yellow-100 transform rotate-1 inline-block">
              <h3 className="text-xl font-semibold mb-4">Coming Soon!</h3>
              <p className="text-gray-600">
                We're working on some great content about sales development and lead generation.
                Check back soon for insights on building your sales pipeline.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post: any, index: number) => (
              <article
                key={post._id}
                className={`border-2 border-dashed border-gray-300 p-6 bg-yellow-100 transform ${
                  index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                } hover:rotate-0 transition-transform duration-300`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex items-center gap-4 mb-2 md:mb-0">
                    {post.featured && (
                      <span className="bg-yellow-300 px-2 py-1 text-xs font-bold transform rotate-2">
                        FEATURED
                      </span>
                    )}
                    <time className="text-sm text-gray-500 italic">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                  </div>
                  <span className="text-sm text-gray-600">by {post.author?.name || 'Anonymous'}</span>
                </div>

                <h2 className="text-2xl font-bold mb-3 hover:text-blue-600">
                  <Link href={`/blog/${post.slug.current}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-gray-200 px-2 py-1 text-xs rounded transform hover:rotate-1 transition-transform"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/blog/${post.slug.current}`}
                  className="inline-block bg-blue-900 text-white px-4 py-2 font-semibold hover:bg-blue-800 transform hover:rotate-1 transition-all"
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Back to Home */}
      <section className="px-6 pb-16 max-w-4xl mx-auto text-center">
        <Link
          href="/"
          className="inline-block border-2 border-dashed border-gray-400 px-6 py-3 bg-yellow-200 hover:bg-yellow-300 transform hover:-rotate-1 transition-all"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  )
}