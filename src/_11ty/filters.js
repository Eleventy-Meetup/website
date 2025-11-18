export { default as date } from 'nunjucks-date';

export function encodeForUrl(string) {
  return encodeURIComponent(string)
}

export function readableDate(dateObj) {
  return new Date(dateObj).toDateString()
}

export function upcomingEvents(events) {
  return events.filter(event => {
    return new Date(event.data.event.startAt.utc) > new Date()
  }).reverse()
}

export function calendarDescription(description) {
  const text = `${description} See https://11tymeetup.dev/ for the full details!`
  return encodeForUrl(text)
}

export function readableDateTime(dateObj) {
  // "Jun 25, 2021, 12:00:00 PM CDT"  <--wanted time zone
  return new Date(dateObj).toLocaleString([],{
    day: '2-digit',
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  })
}

export function nextEvent(events) {
  const filteredEvents = upcomingEvents(events)
  return filteredEvents.length > 0 ? filteredEvents[0].data.event : null
}

export function pastEvents(events) {
  return events.filter(event => {
    return new Date(event.data.event.startAt.utc) < new Date()
  })
}

export function excerpt(post, limit = "300") {
  const content = post.replace(/(<([^>]+)>)/gi, "");
  content.length > limit ? content.substr(0, content.lastIndexOf(" ", limit)) + "..." : content;
  return content;
}
