import React from 'react'
import {storiesOf} from '@storybook/react'
import {ConsentManagerBuilder} from '../src'

storiesOf('ConsentManagerBuilder', module).add(`basic`, () => (
  <ConsentManagerBuilder>{() => {}}</ConsentManagerBuilder>
))
