export type WindowWithAJS = Window & typeof globalThis & {
  // TODO: add AJS types
  analytics?: any
}