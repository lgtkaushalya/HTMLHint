import { Rule } from '../types'

export default {
  id: 'ng-transclude',
  description: 'Avoid ng-transclude to increase predictability',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const attrs = event.attrs
      let attr
      const col = event.col + event.tagName.length + 1

      if (event.tagName.toLowerCase() == 'ng-transclude') {
        reporter.error(
          'Avoid ng-transclude to increase predictability',
          event.line,
          event.col,
          this,
          event.raw
        )
      }

      for (let i = 0, l1 = attrs.length; i < l1; i++) {
        attr = attrs[i]

        if (attr.name.toLowerCase() === 'ng-transclude-slot') {
            reporter.error(
              'Avoid ng-transclude to increase predictability',
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
