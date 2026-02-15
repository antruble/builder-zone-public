import { site } from '@/content/site'

export interface SeoOptions {
  title?: string
  description?: string
  path?: string
}

function setMeta(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function setSeo(opts: SeoOptions): void {
  const { seo } = site

  const fullTitle = opts.title ? `${opts.title} | ${seo.siteName}` : seo.defaultTitle
  const description = opts.description ?? seo.defaultDescription

  document.title = fullTitle

  setMeta('name', 'description', description)
  setMeta('property', 'og:title', fullTitle)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:site_name', seo.siteName)

  if (opts.path) {
    setMeta('property', 'og:url', window.location.origin + opts.path)
  }

  if (seo.ogImage) {
    setMeta('property', 'og:image', seo.ogImage)
  }
}
