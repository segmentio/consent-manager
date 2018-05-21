import React, {Fragment} from 'react'
import {ConsentManager, openConsentManager} from '../../src'

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
      Segment uses data collected by cookies and JavaScript libraries to improve
      your browsing experience, analyze site traffic, deliver personalized
      advertisements, and increase the overall performance of our site.
    </p>
    <p>
      By using our website, you’re agreeing to our{' '}
      <a href="/docs/legal/website-data-collection-policy/" target="_blank">
        Website Data Collection Policy
      </a>.
    </p>
    <p>
      The table below outlines how we use this data by category. To opt out of a
      category of data collection, select “No” and save your preferences.
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

export default () => {
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
          Data Collection and Cookie Preferences
        </button>
      </p>
    </Fragment>
  )
}
