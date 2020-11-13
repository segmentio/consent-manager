import React from 'react'
import groupBy from 'lodash/groupBy'
import { Pane, Heading, SubHeading, Ul, Code, Button } from 'evergreen-ui'
import { ConsentManagerBuilder } from '../src'
import DestinationTile from './components/destination-tile'
import { storiesOf } from '@storybook/react'
import CookieView from './components/CookieView'

function Section(props) {
  return <Pane is="section" marginBottom={24} {...props} />
}

function byCategory(destinations) {
  return groupBy(destinations, 'category')
}

const CategoryBased = () => {
  return (
    <Pane maxWidth={1000} margin={30}>
      <ConsentManagerBuilder
        onError={e => console.error('Error Handling', e)}
        writeKey="tYQQPcY78Hc3T1hXUYk0n4xcbEHnN7r0"
        otherWriteKeys={['vMRS7xbsjH97Bb2PeKbEKvYDvgMm5T3l']}
      >
        {({ destinations, preferences, setPreferences, saveConsent }) => {
          function handleSubmit(e) {
            e.preventDefault()
            saveConsent()
          }

          const categories = byCategory(destinations)

          return (
            <form onSubmit={handleSubmit}>
              <Section>
                <Heading>ACME Would like to track you with the following tools:</Heading>

                {Object.keys(categories).map(cat => {
                  const destinationsForCategory = categories[cat]
                  return (
                    <Pane key={cat} marginTop={20}>
                      <SubHeading>{cat}</SubHeading>
                      <Ul display="flex" flexWrap="wrap">
                        {destinationsForCategory.map(d => (
                          <DestinationTile
                            key={d.id}
                            destination={d}
                            setPreferences={setPreferences}
                            preferences={preferences}
                          />
                        ))}
                      </Ul>
                    </Pane>
                  )
                })}
              </Section>

              <Section>
                <Heading>Preferences</Heading>
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

      <CookieView />
    </Pane>
  )
}

storiesOf('ConsentManagerBuilder', module).add(`Category Based`, () => <CategoryBased />)
