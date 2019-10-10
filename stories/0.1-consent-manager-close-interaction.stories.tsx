import React from 'react'
import cookies from 'js-cookie'
import { Pane, Heading, Button } from 'evergreen-ui'
import { ConsentManager, openConsentManager } from '../src'
import { storiesOf } from '@storybook/react'
import { ImplyConsentOnInteraction } from './ImplyConsentOnInteraction'
import CookieView from './components/CookieView'

const bannerContent = (
  <span>
    We use cookies (and other similar technologies) to collect data to improve your experience on
    our site. By using our website, you’re agreeing to the collection of data as described in our{' '}
    <a
      href="https://segment.com/docs/legal/website-data-collection-policy/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Website Data Collection Policy
    </a>
    .
  </span>
)
const bannerSubContent = 'You can manage your preferences here!'
const preferencesDialogTitle = 'Website Data Collection Preferences'
const preferencesDialogContent = (
  <div>
    <p>
      Segment uses data collected by cookies and JavaScript libraries to improve your browsing
      experience, analyze site traffic, deliver personalized advertisements, and increase the
      overall performance of our site.
    </p>
    <p>
      By using our website, you’re agreeing to our{' '}
      <a
        href="https://segment.com/docs/legal/website-data-collection-policy/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Website Data Collection Policy
      </a>
      .
    </p>
    <p>
      The table below outlines how we use this data by category. To opt out of a category of data
      collection, select “No” and save your preferences.
    </p>
  </div>
)
const cancelDialogTitle = 'Are you sure you want to cancel?'
const cancelDialogContent = (
  <div>
    Your preferences have not been saved. By continuing to use our website, you’re agreeing to our{' '}
    <a
      href="https://segment.com/docs/legal/website-data-collection-policy/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Website Data Collection Policy
    </a>
    .
  </div>
)

const ConsentManagerExample = () => {
  return (
    <Pane>
      <ConsentManager
        writeKey="tYQQPcY78Hc3T1hXUYk0n4xcbEHnN7r0"
        otherWriteKeys={['vMRS7xbsjH97Bb2PeKbEKvYDvgMm5T3l']}
        bannerContent={bannerContent}
        bannerSubContent={bannerSubContent}
        preferencesDialogTitle={preferencesDialogTitle}
        preferencesDialogContent={preferencesDialogContent}
        cancelDialogTitle={cancelDialogTitle}
        cancelDialogContent={cancelDialogContent}
      />

      <Pane marginX={100} marginTop={20}>
        <Heading> Your website content </Heading>
        <Pane display="flex">
          <iframe
            src="https://giphy.com/embed/JIX9t2j0ZTN9S"
            width="480"
            height="480"
            frameBorder="0"
          />

          <iframe
            src="https://giphy.com/embed/yFQ0ywscgobJK"
            width="398"
            height="480"
            frameBorder="0"
          />
        </Pane>

        <p>
          <Button onClick={openConsentManager}>Data Collection and Cookie Preferences</Button>
        </p>

        <p>
          <Heading>to see the banner again:</Heading>
          <Button
            onClick={() => {
              cookies.remove('tracking-preferences')
              window.location.reload()
            }}
          >
            Clear tracking preferences cookie
          </Button>
        </p>
      </Pane>

      <CookieView />
    </Pane>
  )
}

storiesOf('React Component / Basics', module)
  .add(`Basic React Component`, () => <ConsentManagerExample />)
  .add(`Basic React Component with implied consent`, () => <ImplyConsentOnInteraction />)
