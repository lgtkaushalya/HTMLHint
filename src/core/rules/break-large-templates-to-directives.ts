import { Rule } from '../types'

export default {
  id: 'break-large-templates-to-directives',
  description: 'Large templates tend to have mixed responsibilities',
  init(parser, reporter) {
    parser.addListener('end', (event) => {
      if (event.line > 200) {
        reporter.error(
          'Break large templates into directives',
          event.line,
          event.col,
          this,
          event.raw
        )
      }
    })
  },
} as Rule
