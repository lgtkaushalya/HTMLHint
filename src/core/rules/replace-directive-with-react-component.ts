import { Rule } from '../types'

export default {
  id: 'replace-directive-with-react-component',
  description: 'Large templates tend to have mixed responsibilities',
  init(parser, reporter) {
    parser.addListener('end', (event) => {
      if (event.line > 100) {
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
