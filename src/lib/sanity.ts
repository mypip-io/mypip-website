import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')
}

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN, // Only needed for writes
})

// For generating URLs from Sanity image references
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function for queries
export async function sanityFetch<T>(query: string, params?: Record<string, any>): Promise<T> {
  try {
    return await sanityClient.fetch(query, params)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw error
  }
}