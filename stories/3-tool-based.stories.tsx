import React from 'react'
import { Pane, Heading, SubHeading, Ul, Code, Button } from 'evergreen-ui'
import { ConsentManagerBuilder } from '../src'
import DestinationTile from './destination-tile'
import { storiesOf } from '@storybook/react'

function Section(props) {
  return <Pane is="section" marginBottom={24} {...props} />
}

const ToolBased = () => {
  return (
    <Pane maxWidth={1000} margin={30}>
      <ConsentManagerBuilder
        writeKey="mA3XTMcavCUOQo5DL56VIHWcJMsyhAI7"
        otherWriteKeys={['vMRS7xbsjH97Bb2PeKbEKvYDvgMm5T3l']}
      >
        {({ destinations, preferences, setPreferences, saveConsent }) => {
          function handleSubmit(e) {
            e.preventDefault()
            saveConsent()
          }

          return (
            <form onSubmit={handleSubmit}>
              <Section>
                <Heading>ACME Would like to track you with the following tools:</Heading>
                <Ul display="flex" flexWrap="wrap">
                  {destinations.map(d => (
                    <DestinationTile
                      key={d.id}
                      destination={d}
                      setPreferences={setPreferences}
                      preferences={preferences}
                    />
                  ))}
                </Ul>
              </Section>

              <Section>
                <SubHeading>Preferences</SubHeading>
                <Code>{JSON.stringify(preferences)}</Code>
              </Section>

              <Button type="submit" marginRight={8}>
                Save
              </Button>

              <Button type="button" onClick={() => saveConsent(true)} marginRight={8}>
                Allow all
              </Button>

              <Button type="button" onClick={() => saveConsent(false)}>
                Deny all
              </Button>
            </form>
          )
        }}
      </ConsentManagerBuilder>
    </Pane>
  )
}

storiesOf('ConsentManagerBuilder', module).add(`Tool Based`, () => <ToolBased />)
