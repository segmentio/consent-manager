import React, { useEffect, useState } from 'react'
import cookies from 'js-cookie'
import { Pane, Button } from 'evergreen-ui'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { storiesOf } from '@storybook/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import ConsentManager from '../src/consent-manager'
import * as common from './common-react'
import { openConsentManager } from '../src'

const initialPreferences = {
  advertising: false,
  marketingAndAnalytics: true,
  functional: true
}

const CookieView = () => {
  const [cookieVal, updateCookieVal] = useState(cookies.getJSON())

  useEffect(() => {
    const clear = setInterval(() => {
      updateCookieVal(cookies.getJSON())
    }, 1000)
    return () => clearInterval(clear)
  })

  return (
    <SyntaxHighlighter language="json" style={docco}>
      {JSON.stringify(cookieVal, null, 2)}
    </SyntaxHighlighter>
  )
}

const Custom = () => {
  return (
    <Pane maxWidth={1000} margin={30}>
      <ConsentManager
        writeKey="mA3XTMcavCUOQo5DL56VIHWcJMsyhAI7"
        initialPreferences={initialPreferences}
        shouldRequireConsent={() => true}
        {...common}
      />
      <CookieView />

      <Button marginRight={20} onClick={openConsentManager}>
        Change Cookie Preferences
      </Button>
      <Button
        onClick={() => {
          const allCookies = cookies.getJSON()
          Object.keys(allCookies).forEach(key => {
            cookies.remove(key)
          })
          window.location.reload()
        }}
      >
        Clear
      </Button>
    </Pane>
  )
}

storiesOf('Advanced Use Cases', module).add(`Partial consent`, () => <Custom />)
