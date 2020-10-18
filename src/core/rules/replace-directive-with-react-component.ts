import { Rule } from '../types'
var fs = require('fs')

export default {
  id: 'replace-directive-with-react-component',
  description: 'Replace directive with react component',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const globalAny:any = global;
      const tagName = event.tagName;
      const matchingComponentName = tagName.charAt(0).toUpperCase() + tagName.slice(1) + 'Component';
      let dataFilePath = globalAny.rootPath !== undefined ? globalAny.rootPath : process.cwd();
      dataFilePath = dataFilePath.replace(/\/$/, '') + '/.ng-react-copilot-data/extracted_data.json';

      if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const dataObject = JSON.parse(fileData);

        if (dataObject.reactComponents !== undefined
          && dataObject.reactComponents.includes(matchingComponentName)) {
          reporter.error(
            'Replace angular '+ tagName +' directive with react ' + tagName + '-component',
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
