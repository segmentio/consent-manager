import EventEmitter from 'events'
import React from 'react'
import Banner from './banner'
import PreferenceDialog from './preference-dialog'
import CancelDialog from './cancel-dialog'
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories'
import { Destination, CategoryPreferences } from '../types'

const emitter = new EventEmitter()
export function openDialog() {
  emitter.emit('openDialog')
}

export const enum CloseBehavior {
  ACCEPT = 'accept',
  DENY = 'deny',
  DISMISS = 'dismiss'
}

interface ContainerProps {
  setPreferences: (prefs: CategoryPreferences) => void
  saveConsent: (newPreferences?: CategoryPreferences, shouldReload?: boolean) => void
  resetPreferences: () => void
  closeBehavior?: CloseBehavior
  destinations: Destination[]
  newDestinations: Destination[]
  preferences: CategoryPreferences
  isConsentRequired: boolean
  implyConsentOnInteraction: boolean
  bannerContent: React.ReactNode
  bannerSubContent: React.ReactNode
  bannerTextColor: string
  bannerBackgroundColor: string
  preferencesDialogTitle: React.ReactNode
  preferencesDialogContent: React.ReactNode
  cancelDialogTitle: React.ReactNode
  cancelDialogContent: React.ReactNode
}

function normalizeDestinations(destinations: Destination[]) {
  const marketingDestinations: Destination[] = []
  const advertisingDestinations: Destination[] = []
  const functionalDestinations: Destination[] = []

  for (const destination of destinations) {
    if (ADVERTISING_CATEGORIES.find(c => c === destination.category)) {
      advertisingDestinations.push(destination)
    } else if (FUNCTIONAL_CATEGORIES.find(c => c === destination.category)) {
      functionalDestinations.push(destination)
    } else {
      // Fallback to marketing
      marketingDestinations.push(destination)
    }
  }

  return { marketingDestinations, advertisingDestinations, functionalDestinations }
}

const Container: React.FC<ContainerProps> = props => {
  const [isDialogOpen, toggleDialog] = React.useState(false)
  const [showBanner, toggleBanner] = React.useState(true)
  const [isCancelling, toggleCancel] = React.useState(false)

  let banner = React.useRef<HTMLElement>(null)
  let preferenceDialog = React.useRef<HTMLElement>(null)
  let cancelDialog = React.useRef<HTMLElement>(null)

  const {
    marketingDestinations,
    advertisingDestinations,
    functionalDestinations
  } = normalizeDestinations(props.destinations)

  const handleBodyClick = e => {
    // Do nothing if no new implicit consent needs to be saved
    if (
      !props.isConsentRequired ||
      !props.implyConsentOnInteraction ||
      props.newDestinations.length === 0
    ) {
      return
    }

    // Ignore propogated clicks from inside the consent manager
    if (
      (banner.current && banner.current.contains(e.target)) ||
      (preferenceDialog.current && preferenceDialog.current.contains(e.target)) ||
      (cancelDialog.current && cancelDialog.current.contains(e.target))
    ) {
      return
    }

    props.saveConsent(undefined, false)
  }

  const showDialog = () => toggleDialog(true)

  React.useEffect(() => {
    emitter.on('openDialog', showDialog)
    if (props.isConsentRequired && props.implyConsentOnInteraction) {
      document.body.addEventListener('click', handleBodyClick, false)
    }

    return () => {
      emitter.removeListener('openDialog', showDialog)
      document.body.removeEventListener('click', handleBodyClick, false)
    }
  })

  const onClose = () => {
    if (props.closeBehavior === undefined || props.closeBehavior === CloseBehavior.DISMISS) {
      return toggleBanner(false)
    }

    if (props.closeBehavior === CloseBehavior.ACCEPT) {
      return props.saveConsent()
    }

    if (props.closeBehavior === CloseBehavior.DENY) {
      props.setPreferences({
        advertising: false,
        functional: false,
        marketingAndAnalytics: false
      })
      return props.saveConsent()
    }
  }

  const handleCategoryChange = (category: string, value: boolean) => {
    props.setPreferences({
      [category]: value
    })
  }

  const handleSave = () => {
    toggleDialog(false)
    props.saveConsent()
  }

  const handleCancel = () => {
    toggleDialog(false)
    // Only show the cancel confirmation if there's unconsented destinations
    if (props.newDestinations.length > 0) {
      toggleCancel(true)
    } else {
      props.resetPreferences()
    }
  }

  const handleCancelBack = () => {
    toggleDialog(true)
    toggleCancel(false)
  }

  const handleCancelConfirm = () => {
    toggleCancel(false)
    props.resetPreferences()
  }

  const destinations = [
    {
      name: 'Marketing',
      key: 'marketingAndAnalytics',
      destinations: marketingDestinations,
      description:
        'To understand user behavior in order to provide you with a more relevant browsing experience or personalize the content on our site.',
      example:
        'For example, we collect information about which pages you visit to help us present more relevant information.'
    },
    {
      name: 'Advertising',
      key: 'advertising',
      destinations: advertisingDestinations,
      description:
        'To personalize and measure the effectiveness of advertising on our site and other websites.',
      example:
        'For example, we may serve you a personalized ad based on the pages you visit on our site.'
    },
    {
      name: 'Functional',
      key: 'functional',
      destinations: functionalDestinations,
      description:
        'To monitor the performance of our site and to enhance your browsing experience.',
      example: 'For example, these tools enable you to communicate with us via live chat.'
    }
  ]

  return (
    <div>
      {showBanner && props.isConsentRequired && props.newDestinations.length > 0 && (
        <Banner
          innerRef={current => (banner = { current })}
          onClose={onClose}
          onChangePreferences={() => toggleDialog(true)}
          content={props.bannerContent}
          subContent={props.bannerSubContent}
          textColor={props.bannerTextColor}
          backgroundColor={props.bannerBackgroundColor}
        />
      )}

      {isDialogOpen && (
        <PreferenceDialog
          innerRef={current => (preferenceDialog = { current })}
          onCancel={handleCancel}
          onSave={handleSave}
          onChange={handleCategoryChange}
          destinations={destinations}
          preferences={props.preferences}
          title={props.preferencesDialogTitle}
          content={props.preferencesDialogContent}
        />
      )}

      {isCancelling && (
        <CancelDialog
          innerRef={current => (cancelDialog = { current })}
          onBack={handleCancelBack}
          onConfirm={handleCancelConfirm}
          title={props.cancelDialogTitle}
          content={props.cancelDialogContent}
        />
      )}
    </div>
  )
}

export default Container
