import imageUrl from '@sanity/image-url'
import sanityClient from './sanityClient.js'

// Learn more: https://www.sanity.io/docs/asset-pipeline/image-urls
export default function urlFor(source) {
  return imageUrl(sanityClient).image(source)
}
