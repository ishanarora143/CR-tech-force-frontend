export const GA_TRACKING_ID = 'G-TE3WTJXZWW'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    send_page_view: false
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = ({ action, name, value, page_location }) => {
  window.gtag('event', action, {
    event_name: name,
    value: value,
    page_location,
  })
}
