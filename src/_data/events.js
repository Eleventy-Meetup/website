const groq = require('groq')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const urlFor = require('../utils/imageUrl.js')

// TODO: delete?
const hasToken = !!client.config().token

function toMarkdown(block) {
  return BlocksToMarkdown(block, { serializers, ...client.config() })
}

function generateSpeaker(speaker) {
  return {
    ...speaker,
    bio: toMarkdown(speaker.bio),
    headshotSrc: urlFor(speaker.image).width(300).height(300).url(),
  }
}

function generateTalk(talk) {
  return {
    ...talk,
    description: toMarkdown(talk.description),
    speaker: talk.speaker ? generateSpeaker(talk.speaker) : null,
  }
}

function generateEvent (event) {
  return {
    ...event,
    overview: toMarkdown(event.overview),
    talks: event.eventTalks ? event.eventTalks.map(talk => generateTalk(talk)) : null,
  }
}

async function getEvents () {
  const filter = groq`
    *[_type == "event"]{
      title,
      overview,
      startAt,
      slug,
      'eventTalks': eventTalks[].talk->{
        title,
        description,
        'speaker': person->{
          name,
          bio,
          image,
          website,
          twitter
        }
      }
    }| order(startAt.local desc)`
  const docs = await client.fetch(filter).catch(err => console.error(err))
  const events = docs.map(generateEvent)
  const reducedEvents = overlayDrafts(hasToken, events)
  return reducedEvents
}

module.exports = getEvents
