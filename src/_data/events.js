const groq = require('groq')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const urlFor = require('../utils/imageUrl.js')

// TODO: delete?
const hasToken = !!client.config().token

function generateEvent (event) {
  return {
    ...event,
    overview: BlocksToMarkdown(event.overview, { serializers, ...client.config() }),
    // headshotSrc: urlFor(event.image).width(300).height(300).url(),
  }
}

async function getEvents () {
  const filter = groq`*[_type == "event"] | order(beginAt desc)`
  const docs = await client.fetch(filter).catch(err => console.error(err))
  const events = docs.map(generateEvent)
  const reducedEvents = overlayDrafts(hasToken, events)
  return reducedEvents
}

module.exports = getEvents
