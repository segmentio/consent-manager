import React from 'react'
import {storiesOf} from '@storybook/react'
import {injectGlobal} from 'emotion'
import BuilderExample from './consent-manager-builder'
import ToolBased from './tool-based'
import ConsentManagerExample from './consent-manager'

if (window.localStorage) {
  window.localStorage.setItem('debug', 'analytics.js')
}

injectGlobal(`
  body {
    margin: 0;
  }

  ul li {
    list-style: none;
  }
`)

storiesOf('ConsentManagerBuilder', module)
  .add(`Complex`, () => <BuilderExample />)
  .add(`Tool Based`, () => <ToolBased />)

storiesOf('ConsentManager', module).add(`Standalone React Component`, () => (
  <ConsentManagerExample />
))
