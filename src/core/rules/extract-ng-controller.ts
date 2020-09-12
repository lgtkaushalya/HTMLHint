import { Rule } from '../types'

export default {
  id: 'extract-ng-controller',
  description: 'Extract ng-controller usage as a directive',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      for (let i = 0, l1 = attrs.length; i < l1; i++) {
        attr = attrs[i]

        if (attr.name.toLowerCase() === 'ng-controller') {
            reporter.error(
              'Extract ng-controller usage as a directive',
              event.line,
              event.col,
              this,
              event.raw
            )
        }
      }
    })
  },
} as Rule
