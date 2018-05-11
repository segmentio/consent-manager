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
      We collect data and use cookies to improve your experience on our site. By
      using our website, you’re agreeing to the collection of data and use of
      cookies as described in our{' '}
      <a href="/docs/legal/privacy/" target="_blank">
        privacy policy
      </a>.
    </span>
  )
  const dialogTitle = 'Segment Data Collection and Cookie Preferences'
  const dialogContent = (
    <div>
      <p>
        Segment collects data and uses cookies or other similar technologies to
        improve your browsing experience, analyze our site traffic, send
        tailored messages, and increase the overall performance of our site. By
        using our website, you’re agreeing to the collection of data and use of
        cookies as described in our{' '}
        <a href="/docs/legal/privacy/" target="_blank">
          privacy policy
        </a>. You can change your preferences at any time.
      </p>
      <p>
        We collect data and/or use cookies for the following categories of
        tools. To opt out of any category, uncheck the box and save your
        preferences.
      </p>
    </div>
  )
  return (
    <Fragment>
      <ConsentManager
        writeKey="mA3XTMcavCUOQo5DL56VIHWcJMsyhAI7"
        otherWriteKeys={['vMRS7xbsjH97Bb2PeKbEKvYDvgMm5T3l']}
        bannerContent={bannerContent}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
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
          Data Collection and Cookie Preferences
        </button>
      </p>
    </Fragment>
  )
})
