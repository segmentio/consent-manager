import React, {Fragment} from 'react'
import {storiesOf} from '@storybook/react'
import {Pane, Button, Heading, Ul, Li, Code, Checkbox} from 'evergreen-ui'
import {injectGlobal} from 'emotion'
import {ConsentManagerBuilder, ConsentManager, openConsentManager} from '../src'

if (window.localStorage) {
  window.localStorage.setItem('debug', 'analytics.js')
}

injectGlobal(`
  body {
    margin: 0;
  }
`)

function Section(props) {
  return <Pane is="section" marginBottom={24} {...props} />
}

storiesOf('ConsentManagerBuilder', module).add(`example`, () => (
  <ConsentManagerBuilder
    writeKey="mA3XTMcavCUOQo5DL56VIHWcJMsyhAI7"
    otherWriteKeys={['vMRS7xbsjH97Bb2PeKbEKvYDvgMm5T3l']}
  >
    {({
      destinations,
      newDestinations,
      preferences,
      setPreferences,
      saveConsent
    }) => {
      function handleSubmit(e) {
        e.preventDefault()
        saveConsent()
      }

      return (
        <form onSubmit={handleSubmit}>
          <Section>
            <Heading>All destinations</Heading>
            <Ul>
              {destinations.map(destination => (
                <Li key={destination.id}>
                  <Checkbox
                    label={destination.name}
                    checked={Boolean(preferences[destination.id])}
                    onChange={() =>
                      setPreferences({
                        [destination.id]: !preferences[destination.id]
                      })
                    }
                  />
                </Li>
              ))}
            </Ul>
          </Section>

          <Section>
            <Heading>New destinations</Heading>
            <Ul>
              {newDestinations.map(destination => (
                <Li key={destination.id}>{destination.name}</Li>
              ))}
            </Ul>
          </Section>

          <Section>
            <Heading>Preferences</Heading>
            <Code>{JSON.stringify(preferences)}</Code>
          </Section>

          <Button type="submit" marginRight={8}>
            Save
          </Button>

          <Button
            type="button"
            onClick={() => saveConsent(true)}
            marginRight={8}
          >
            Allow all
          </Button>

          <Button type="button" onClick={() => saveConsent(false)}>
            Deny all
          </Button>
        </form>
      )
    }}
  </ConsentManagerBuilder>
))

storiesOf('ConsentManager', module).add(`example`, () => {
  const bannerContent = (
    <span>
      We use cookies (and other similar technologies) to collect data to improve
      your experience on our site. By using our website, you’re agreeing to the
      collection of data as described in our{' '}
      <a href="/docs/legal/website-data-collection-policy/" target="_blank">
        Website Data Collection Policy
      </a>.
    </span>
  )
  const preferencesDialogTitle = 'Website Data Collection Preferences'
  const preferencesDialogContent = (
    <div>
      <p>
        Segment uses data collected by cookies and JavaScript libraries to
        improve your browsing experience, analyze site traffic, deliver
        personalized advertisements, and increase the overall performance of our
        site.
      </p>
      <p>
        By using our website, you’re agreeing to our{' '}
        <a href="/docs/legal/website-data-collection-policy/" target="_blank">
          Website Data Collection Policy
        </a>.
      </p>
      <p>
        The table below outlines how we use this data by category. To opt out of
        a category of data collection, select “No” and save your preferences.
      </p>
    </div>
  )
  const cancelDialogTitle = 'Are you sure you want to cancel?'
  const cancelDialogContent = (
    <div>
      Your preferences have not been saved. By continuing to use our website,
      you’re agreeing to our{' '}
      <a href="/docs/legal/website-data-collection-policy/" target="_blank">
        Website Data Collection Policy
      </a>.
    </div>
  )
  return (
    <Fragment>
      <ConsentManager
        writeKey="mA3XTMcavCUOQo5DL56VIHWcJMsyhAI7"
        otherWriteKeys={['vMRS7xbsjH97Bb2PeKbEKvYDvgMm5T3l']}
        bannerContent={bannerContent}
        preferencesDialogTitle={preferencesDialogTitle}
        preferencesDialogContent={preferencesDialogContent}
        cancelDialogTitle={cancelDialogTitle}
        cancelDialogContent={cancelDialogContent}
      />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
        dignissimos porro omnis illo iusto non, unde veniam praesentium ut.
        Veniam quidem odio nisi possimus minus quae ipsa rem voluptates
        consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Temporibus dignissimos porro omnis illo iusto non, unde veniam
        praesentium ut. Veniam quidem odio nisi possimus minus quae ipsa rem
        voluptates consequatur. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Temporibus dignissimos porro omnis illo iusto non,
        unde veniam praesentium ut. Veniam quidem odio nisi possimus minus quae
        ipsa rem voluptates consequatur.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
        dignissimos porro omnis illo iusto non, unde veniam praesentium ut.
        Veniam quidem odio nisi possimus minus quae ipsa rem voluptates
        consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Temporibus dignissimos porro omnis illo iusto non, unde veniam
        praesentium ut. Veniam quidem odio nisi possimus minus quae ipsa rem
        voluptates consequatur. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Temporibus dignissimos porro omnis illo iusto non,
        unde veniam praesentium ut. Veniam quidem odio nisi possimus minus quae
        ipsa rem voluptates consequatur.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
        dignissimos porro omnis illo iusto non, unde veniam praesentium ut.
        Veniam quidem odio nisi possimus minus quae ipsa rem voluptates
        consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Temporibus dignissimos porro omnis illo iusto non, unde veniam
        praesentium ut. Veniam quidem odio nisi possimus minus quae ipsa rem
        voluptates consequatur. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Temporibus dignissimos porro omnis illo iusto non,
        unde veniam praesentium ut. Veniam quidem odio nisi possimus minus quae
        ipsa rem voluptates consequatur.
      </p>
      <p>
        <button type="button" onClick={openConsentManager}>
          Website Data Collection Preferences
        </button>
      </p>
    </Fragment>
  )
})
