import React from 'react'
import {storiesOf} from '@storybook/react'
import {ConsentManagerBuilder} from '../src'

storiesOf('ConsentManagerBuilder', module).add(`basic`, () => (
  <ConsentManagerBuilder
    writeKey="uA7UpbCh8Z0Ybodlnf4rJ6vLa85WrJfe"
    otherWriteKeys={['SeTHUkkIadsYUTWhMI3tkGu01XKogPHn']}
  >
    {({destinations, preferences}) => (
      <div>
        {destinations.map(destination => (
          <div key={destination.id}>{destination.name}</div>
        ))}
        {JSON.stringify(preferences)}
      </div>
    )}
  </ConsentManagerBuilder>
))
