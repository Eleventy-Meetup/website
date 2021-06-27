---
layout: layouts/layout.njk
tags:
  - ourEvents
pagination:
  alias: event
  data: events
  size: 1
  addAllPagesToCollections: true
permalink: events/{{ event.slug.current | slug }}/index.html
---

# {{event.title}}

{{event.overview}}

{% if event.eventTalks %}

  ## Talks

  {% for talk in eventTalks %}
    {{talk.title}}
  {% endfor %}

{% endif %}

{{event | log}}
<!-- {
  _createdAt: '2021-06-27T18:31:43Z',
  _id: '9c494db7-63b7-47bf-b178-dc7a5c786235',
  _rev: 'Mz0SrFDEdLa1FmyLx6fiW0',
  _type: 'event',
  _updatedAt: '2021-06-27T18:31:43Z',
  beginAt: '2021-06-22T18:31:00.000Z',
  overview: "Hi I'm an event with no talks",
  slug: { _type: 'slug', current: 'an-older-event' },
  title: 'An older event with no talks'
} -->

<!-- {
  _createdAt: '2021-06-25T21:14:43Z',
  _id: '2b9fbb39-bf4b-45c7-adc7-e30d9d67ee7f',
  _rev: 'Mz0SrFDEdLa1FmyLx6fgcK',
  _type: 'event',
  _updatedAt: '2021-06-27T18:31:07Z',
  beginAt: '2021-07-15T17:00:00.000Z',
  endAt: '2021-07-15T18:00:00.000Z',
  eventTalks: [
    { _key: '79b163ee7977', _type: 'eventTalk', talk: [Object] },
    { _key: '20caad0bfabd', _type: 'eventTalk', talk: [Object] }
  ],
  overview: "Hello, world! In our first edition of the Eleventy Meetup, we're bringing you a talk from our illustrious leader, Zach Leatherman.",
  slug: { _type: 'slug', current: 'possum-posse-kickoff' },
  title: 'Possum posse kickoff'
} -->