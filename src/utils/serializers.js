import imageUrl from './imageUrl.js'
import blocksToHtml from '@sanity/block-content-to-html'
// `h` is a way to build HTML known as hyperscript
// See https://github.com/hyperhype/hyperscript for more info
const h = blocksToHtml.h

// Learn more on https://www.sanity.io/guides/introduction-to-portable-text
export default {
  types: {
    authorReference: ({node}) => `[${node.name}](/authors/${node.slug.current})`,
    code: props => (
      h('pre', {className: props.node.language},
        h('code', props.node.code)
      )
    ),
    mainImage: ({node}) => `![${node.alt}](${imageUrl(node).width(600).url()})`
  }
}
