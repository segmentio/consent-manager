import React from 'react'
import {storiesOf} from '@storybook/react'
import {injectGlobal} from 'emotion'
import ToolBased from './tool-based'
import CategoryBased from './category-based'
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

storiesOf('ConsentManager', module).add(`Standalone React Component`, () => (
  <ConsentManagerExample />
))

storiesOf('ConsentManagerBuilder', module)
  .add(`Tool Based`, () => <ToolBased />)
  .add(`Category Based`, () => <CategoryBased />)
