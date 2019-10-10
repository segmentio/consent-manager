import React from 'react'
import cookies from 'js-cookie'
import { Pane, Heading, Button, Paragraph } from 'evergreen-ui'
import { ConsentManager, openConsentManager } from '../src'
import {
  bannerContent,
  bannerSubContent,
  preferencesDialogContent,
  preferencesDialogTitle,
  cancelDialogContent,
  cancelDialogTitle
} from './components/common-react'

export const ImplyConsentOnInteraction = () => {
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
        implyConsentOnInteraction
      />

      <Pane marginX={100} marginTop={20}>
        <Heading> Your website content </Heading>
        <Paragraph>
          Clicking anywhere on this page will cause the Consent Manager to imply consent.
        </Paragraph>

        <Pane display="flex">
          <iframe
            src="https://giphy.com/embed/yFQ0ywscgobJK"
            width="398"
            height="480"
            frameBorder="0"
          />
        </Pane>

        <div>
          <Button onClick={openConsentManager}>Data Collection and Cookie Preferences</Button>
        </div>

        <div>
          <Heading>to see the banner again:</Heading>
          <Button
            onClick={() => {
              cookies.remove('tracking-preferences')
              window.location.reload()
            }}
          >
            Clear tracking preferences cookie
          </Button>
        </div>
      </Pane>
    </Pane>
  )
}
