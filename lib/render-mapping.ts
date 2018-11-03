import {render as cssRender} from './css-renderer'
import {render as jsRender} from './js-renderer'
import {render as xmlRender} from './xml-renderer'
import {render as yamlRender} from './yaml-renderer'

export const renderMapping = {
  css: cssRender,
  js: jsRender,
  xml: xmlRender,
  yaml: yamlRender
}
