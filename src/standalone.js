import React from 'react'
import ReactDOM from 'react-dom'
import inEU from '@segment/in-eu'
import {ConsentManager, openConsentManager, doNotTrack} from '.'

export const version = process.env.VERSION
export {openConsentManager, doNotTrack, inEU}

const dataset = document.currentScript && document.currentScript.dataset

let props = {}
if (window.consentManagerConfig) {
  // Allow using global variable
  if (typeof window.consentManagerConfig === 'function') {
    props = window.consentManagerConfig({
      React,
      version,
      openConsentManager,
      doNotTrack,
      inEU
    })
  } else {
    props = window.consentManagerConfig
  }
} else if (dataset) {
  // Allow using data attributes on the script tag
  props.container = dataset.container
  props.writeKey = dataset.writekey
  props.otherWriteKeys = dataset.otherwritekeys
  props.implyConsentOnInteraction = dataset.implyconsentoninteraction
  props.implyConsentType = dataset.implyconsenttype
  props.cookieDomain = dataset.cookiedomain
  props.bannerContent = dataset.bannercontent
  props.bannerTextColor = dataset.bannertextcolor
  props.bannerBackgroundColor = dataset.bannerbackgroundcolor
  props.preferencesDialogTitle = dataset.preferencesdialogtitle
  props.preferencesDialogContent = dataset.preferencesdialogcontent
  props.cancelDialogTitle = dataset.canceldialogtitle
  props.cancelDialogContent = dataset.canceldialogcontent
}

if (!props.container) {
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

if (typeof props.otherWriteKeys === 'string') {
  props.otherWriteKeys = props.otherWriteKeys.split(',')
}

if (typeof props.implyConsentOnInteraction === 'string') {
  props.implyConsentOnInteraction = props.implyConsentOnInteraction === 'true'
}

const container = document.querySelector(props.container)

if (!container) {
  throw new Error('ConsentManager: container not found')
}

ReactDOM.render(<ConsentManager {...props} />, container)
