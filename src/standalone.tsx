import React from 'react'
import ReactDOM from 'react-dom'
import inEU from '@segment/in-eu'
import { ConsentManager, openConsentManager, doNotTrack } from '.'
import { ConsentManagerProps, WindowWithConsentManagerConfig, ConsentManagerInput } from './types'
import { CloseBehavior } from './consent-manager/container'

export const version = process.env.VERSION
export { openConsentManager, doNotTrack, inEU }

// TODO: define string based input type that can be parsed to `ConsentManagerInput`
let props: Partial<ConsentManagerInput> = {}
let containerRef: string | undefined

const localWindow = window as WindowWithConsentManagerConfig

if (localWindow.consentManagerConfig) {
  // Allow using global variable
  if (typeof localWindow.consentManagerConfig === 'function') {
    props = localWindow.consentManagerConfig({
      React,
      version,
      openConsentManager,
      doNotTrack,
      inEU
    })
  } else {
    throw new Error(`window.consentManagerConfig should be a function`)
  }

  containerRef = props.container
}

if (!containerRef) {
  throw new Error('ConsentManager: container is required')
}

if (!props.writeKey) {
  throw new Error('ConsentManager: writeKey is required')
}

if (!props.bannerContent) {
  throw new Error('ConsentManager: bannerContent is required')
}

if (!props.preferencesDialogContent) {
  throw new Error('ConsentManager: preferencesDialogContent is required')
}

if (!props.cancelDialogContent) {
  throw new Error('ConsentManager: cancelDialogContent is required')
}

if (typeof props.implyConsentOnInteraction === 'string') {
  props.implyConsentOnInteraction = props.implyConsentOnInteraction === 'true'
}

if (props.closeBehavior !== undefined && typeof props.closeBehavior === 'string') {
  const options = [
    CloseBehavior.ACCEPT.toString(),
    CloseBehavior.DENY.toString(),
    CloseBehavior.DISMISS.toString()
  ]

  if (!options.includes(props.closeBehavior)) {
    throw new Error(`ConsentManager: closeBehavior should be one of ${options}`)
  }
}

const container = document.querySelector(containerRef)
if (!container) {
  throw new Error('ConsentManager: container not found')
}

ReactDOM.render(<ConsentManager {...(props as ConsentManagerProps)} />, container)
