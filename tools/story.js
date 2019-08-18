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
      collection of data as described in our
    </span>
  )

  const privacyPolicyContent = (
    <div>
      Online Privacy Policy What information do we collect? We collect
      information from you when you respond to a survey. Google, as a third
      party vendor, uses cookies to serve ads on your site. Google use of the
      DART cookie enables it to serve ads to your users based on their visit to
      your sites and other sites on the Internet. Users may opt out of the use
      of the DART cookie by visiting the Google ad and content network privacy
      policy.. What do we use your information for? Any of the information we
      collect from you may be used in one of the following ways: To improve our
      website (we continually strive to improve our website offerings based on
      the information and feedback we receive from you) Do we use cookies? Yes
      (Cookies are small files that a site or its service provider transfers to
      your computers hard drive through your Web browser (if you allow) that
      enables the sites or service providers systems to recognize your browser
      and capture and remember certain information We use cookies to compile
      aggregate data about site traffic and site interaction so that we can
      offer better site experiences and tools in the future. We may contract
      with third-party service providers to assist us in better understanding
      our site visitors. These service providers are not permitted to use the
      information collected on our behalf except to help us conduct and improve
      our business. Do we disclose any information to outside parties? We do not
      sell, trade, or otherwise transfer to outside parties your personally
      identifiable information. This does not include trusted third parties who
      assist us in operating our website, conducting our business, or servicing
      you, so long as those parties agree to keep this information confidential.
      We may also release your information when we believe release is
      appropriate to comply with the law, enforce our site policies, or protect
      ours or others rights, property, or safety. However, non-personally
      identifiable visitor information may be provided to other parties for
      marketing, advertising, or other uses. Third party links Occasionally, at
      our discretion, we may include or offer third party products or services
      on our website. These third party sites have separate and independent
      privacy policies. We therefore have no responsibility or liability for the
      content and activities of these linked sites. Nonetheless, we seek to
      protect the integrity of our site and welcome any feedback about these
      sites. California Online Privacy Protection Act Compliance Because we
      value your privacy we have taken the necessary precautions to be in
      compliance with the California Online Privacy Protection Act. We therefore
      will not distribute your personal information to outside parties without
      your consent. Childrens Online Privacy Protection Act Compliance We are in
      compliance with the requirements of COPPA (Childrens Online Privacy
      Protection Act), we do not collect any information from anyone under 13
      years of age. Our website, products and services are all directed to
      people who are at least 13 years old or older. Online Privacy Policy Only
      This online privacy policy applies only to information collected through
      our website and not to information collected offline. Terms and Conditions
      Please also visit our Terms and Conditions section establishing the use,
      disclaimers, and limitations of liability governing the use of our website
      at terms and conditions. Your Consent By using our site, you consent to
      our privacy policy. Changes to our Privacy Policy If we decide to change
      our privacy policy, we will post those changes on this page, and/or update
      the Privacy Policy modification date below. This policy was last modified
      on 2013-12-16 Contacting Us If there are any questions regarding this
      privacy policy you may contact us using the information below.
      generator.lorem-ipsum.info 126 Electricov St. Kiev, Kiev 04176 Ukraine
      contact@lorem-ipsum.info
    </div>
  )
  const bannerBackgroundColor = 'black'

  console.log(privacyPolicyContent)
  return (
    <Fragment>
      <ConsentManager
        writeKey="mA3XTMcavCUOQo5DL56VIHWcJMsyhAI7"
        otherWriteKeys={['vMRS7xbsjH97Bb2PeKbEKvYDvgMm5T3l']}
        bannerContent={bannerContent}
        bannerBackgroundColor={bannerBackgroundColor}
        bannerWidth="500px"
        privacyPolicyContent={privacyPolicyContent}
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
