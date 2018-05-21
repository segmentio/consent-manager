import React from 'react'
import {storiesOf} from '@storybook/react'
import {injectGlobal} from 'emotion'
import BuilderExample from './consent-manager-builder'
import ConsentManagerExample from './consent-manager'

if (window.localStorage) {
  window.localStorage.setItem('debug', 'analytics.js')
}

injectGlobal(`
  body {
    margin: 0;
  }
`)

storiesOf('ConsentManagerBuilder', module).add(`Tool based`, () => (
  <BuilderExample />
))

storiesOf('ConsentManager', module).add(`Standalone React Component`, () => (
  <ConsentManagerExample />
))
