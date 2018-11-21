import { render as cssRender } from './renderer/css-renderer'
import { render as jsRender } from './renderer/js-renderer'
import { render as xmlRender } from './renderer/xml-renderer'
import { render as yamlRender } from './renderer/yaml-renderer'

export const renderMapping = {
  css: cssRender,
  js: jsRender,
  xml: xmlRender,
  yaml: yamlRender,
}
