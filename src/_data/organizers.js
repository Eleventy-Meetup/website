import groq from 'groq'
import blocksToHtml from '@sanity/block-content-to-html'
import client from '../utils/sanityClient.js'
import serializers from '../utils/serializers.js'
import overlayDrafts from '../utils/overlayDrafts.js'
import urlFor from '../utils/imageUrl.js'

// TODO: delete?
const hasToken = !!client.config().token

function generateOrganizer (person) {
  return {
    ...person,
    bio: blocksToHtml({blocks: person.bio, serializers}),
    headshotSrc: urlFor(person.image).width(300).height(300).url(),
  }
}

export default async function getOrganizers () {
  const filter = groq`*[_type == "person" && organizer] | order(name asc)`
  const docs = await client.fetch(filter).catch(err => console.error(err))
  const organizers = docs.map(generateOrganizer)
  const reducedOrganizers = overlayDrafts(hasToken, organizers)
  return reducedOrganizers
}
