import { Rule } from '../types'
var fs = require('fs')
const _ = require('lodash')

export default {
  id: 'missing-required-props-in-components',
  description: 'Required props should be pass to the react component',
  init(parser, reporter) {
    parser.addListener('tagstart', (event) => {
      const globalAny:any = global;
      const tagName = event.tagName;
      const matchingComponentName =  _.upperFirst(_.camelCase(tagName.charAt(0).toUpperCase() + tagName.slice(1)));
      let dataFilePath = globalAny.rootPath !== undefined ? globalAny.rootPath : process.cwd();
      dataFilePath = dataFilePath.replace(/\/$/, '') + '/.ng-react-copilot-data/extracted_data.json';

      if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const dataObject = JSON.parse(fileData);

        if (dataObject.reactComponents !== undefined
          && Object.keys(dataObject.reactComponents).includes(matchingComponentName)) {
          const attrs = event.attrs

          let attrNameArray:String[] = [];
          for (let i = 0, l = attrs.length; i < l; i++) {
            let attr = attrs[i]
            const attrName = attr.name.charAt(0) + _.camelCase(attr.name.slice(1));
            //console.log(attrName)
            attrNameArray.push(attrName);
          }

          let missingPropTypes = dataObject.reactComponents[matchingComponentName].requiredPropTypes.filter(function(propType:String) {
            return !attrNameArray.includes(propType);
          });

          if (missingPropTypes.length > 0) {
            reporter.error(
              "The required \"" +missingPropTypes.join()+ "\" prop(s) should be pass to the react component.",
              event.line,
              event.col,
              this,
              event.raw
            )
          }
        }
      }
    })
  },
} as Rule
