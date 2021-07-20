const date = require('nunjucks-date');

function readableDate(dateObj) {
  return new Date(dateObj).toDateString()
}

function upcomingEvents(events) {
  return events.filter(event => {
    return new Date(event.data.event.startAt.utc) > new Date()
  }).reverse()
}

module.exports = {
  date,
  readableDate,
  readableDateTime: dateObj => {
    // "Jun 25, 2021, 12:00:00 PM CDT"  <--wanted time zone
    return new Date(dateObj).toLocaleString([],{
      day: '2-digit',
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    })
  },
  nextEvent: events => {
    const filteredEvents = upcomingEvents(events)
    return filteredEvents.length > 0 ? filteredEvents[0].data.event : null
  },
  pastEvents: events => {
    return events.filter(event => {
      return new Date(event.data.event.startAt.utc) < new Date()
    })
  },
  upcomingEvents,
}
