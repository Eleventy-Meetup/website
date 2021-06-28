const groq = require('groq')
const blocksToHtml = require('@sanity/block-content-to-html')
const client = require('../utils/sanityClient.js')
const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const urlFor = require('../utils/imageUrl.js')

// TODO: delete?
const hasToken = !!client.config().token

function generateSpeaker(speaker) {
  return {
    ...speaker,
    bio: blocksToHtml({blocks: speaker.bio, serializers}),
    headshotSrc: urlFor(speaker.image).width(300).height(300).url(),
  }
}

function generateTalk(talk) {
  return {
    ...talk,
    description: blocksToHtml({blocks: talk.description, serializers}),
    speaker: talk.speaker ? generateSpeaker(talk.speaker) : null,
  }
}

function generateEvent (event) {
  return {
    ...event,
    overview: blocksToHtml({blocks: event.overview, serializers}),
    talks: event.eventTalks ? event.eventTalks.map(talk => generateTalk(talk)) : null,
  }
}

async function getEvents () {
  const filter = groq`
    *[_type == "event" && published]{
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
