
export interface RenderFunc {
  (source: string, template: string, copyrightDetectRule: RegExp): RenderResult
}

export interface RenderResult {
  content: string
  status: 'update' | 'append' | 'identical'
}

export type RenderStatus = 'update' | 'append' | 'identical'

export enum renderStatus {
  update = 'update',
  append = 'append',
  identical = 'identical'
}
