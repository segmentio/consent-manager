import React, {Fragment} from 'react'
import {storiesOf} from '@storybook/react'
import {ConsentManagerBuilder} from '../src'

storiesOf('ConsentManagerBuilder', module).add(`basic`, () => (
  <ConsentManagerBuilder
    writeKey="uA7UpbCh8Z0Ybodlnf4rJ6vLa85WrJfe"
    otherWriteKeys={['SeTHUkkIadsYUTWhMI3tkGu01XKogPHn']}
  >
    {({destinations, newDestinations, preferences, saveConsent}) => (
      <Fragment>
        <strong>All destinations</strong>
        <ul>
          {destinations.map(destination => (
            <li key={destination.id}>{destination.name}</li>
          ))}
        </ul>
        <strong>New destinations:</strong>
        <ul>
          {newDestinations.map(destination => (
            <li key={destination.id}>{destination.name}</li>
          ))}
        </ul>

        <button type="button" onClick={() => saveConsent(true)}>
          Allow all
        </button>

        <button type="button" onClick={() => saveConsent(false)}>
          Deny all
        </button>

        {JSON.stringify(preferences)}
      </Fragment>
    )}
  </ConsentManagerBuilder>
))
