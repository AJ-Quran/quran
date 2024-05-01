export function changeHref(href) {
  window.location.href = typeof href === 'string' ? href : '/'
}
