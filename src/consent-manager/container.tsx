import EventEmitter from 'events'
import React from 'react'
import Banner from './banner'
import PreferenceDialog from './preference-dialog'
import CancelDialog from './cancel-dialog'
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories'
import {
  Destination,
  CategoryPreferences,
  CustomCategories,
  DefaultDestinationBehavior,
  ActionsBlockProps,
  PreferenceDialogTemplate,
  CloseBehavior
} from '../types'

const emitter = new EventEmitter()
export function openDialog() {
  emitter.emit('openDialog')
}

export interface CloseBehaviorFunction {
  (categories: CategoryPreferences): CategoryPreferences
}

interface ContainerProps {
  setPreferences: (prefs: CategoryPreferences) => void
  saveConsent: (newPreferences?: CategoryPreferences, shouldReload?: boolean) => void
  resetPreferences: () => void
  closeBehavior?: CloseBehavior | CloseBehaviorFunction
  destinations: Destination[]
  customCategories?: CustomCategories | undefined
  newDestinations: Destination[]
  preferences: CategoryPreferences
  havePreferencesChanged: boolean
  isConsentRequired: boolean
  implyConsentOnInteraction: boolean
  bannerContent: React.ReactNode
  bannerSubContent: string | undefined
  bannerActionsBlock?: ((props: ActionsBlockProps) => React.ReactElement) | true
  bannerTextColor: string
  bannerBackgroundColor: string
  bannerHideCloseButton: boolean
  bannerAsModal?: boolean
  preferencesDialogTitle: React.ReactNode
  preferencesDialogContent: React.ReactNode
  cancelDialogTitle: React.ReactNode
  cancelDialogContent: React.ReactNode
  workspaceAddedNewDestinations?: boolean
  defaultDestinationBehavior?: DefaultDestinationBehavior
  preferencesDialogTemplate?: PreferenceDialogTemplate
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
  const [isDialogOpen, toggleDialog] = React.useState(
    false || (props.workspaceAddedNewDestinations && props.defaultDestinationBehavior === 'ask')
  )
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

  const onAcceptAll = () => {
    const truePreferences = Object.keys(props.preferences).reduce((acc, category) => {
      acc[category] = true
      return acc
    }, {})
    props.setPreferences(truePreferences)
    return props.saveConsent()
  }

  const onDenyAll = () => {
    const falsePreferences = Object.keys(props.preferences).reduce((acc, category) => {
      acc[category] = false
      return acc
    }, {})

    props.setPreferences(falsePreferences)
    return props.saveConsent()
  }

  const onClose = () => {
    if (props.closeBehavior === undefined || props.closeBehavior === 'dismiss') {
      return toggleBanner(false)
    }

    if (props.closeBehavior === 'accept') {
      return onAcceptAll()
    }

    if (props.closeBehavior === 'deny') {
      return onDenyAll()
    }

    // closeBehavior is a custom function
    const customClosePreferences = props.closeBehavior(props.preferences)
    props.setPreferences(customClosePreferences)
    props.saveConsent()
    return toggleBanner(false)
  }

  const showDialog = () => toggleDialog(true)

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

    // Accept all consent on page interaction.
    if (!isDialogOpen && props.implyConsentOnInteraction) {
      onAcceptAll()
    }
  }

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

  React.useEffect(() => {
    if (isDialogOpen) {
      props.resetPreferences()
    }
  }, [isDialogOpen])

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
    // Only show the cancel confirmation if there's unconsented destinations
    if (props.newDestinations.length > 0) {
      toggleCancel(true)
    } else {
      toggleDialog(false)
      props.resetPreferences()
    }
  }

  const handleCancelBack = () => {
    toggleCancel(false)
  }

  const handleCancelConfirm = () => {
    toggleCancel(false)
    toggleDialog(false)
    props.resetPreferences()
  }

  return (
    <>
      {showBanner && props.isConsentRequired && props.newDestinations.length > 0 && (
        <Banner
          innerRef={current => (banner = { current })}
          onClose={onClose}
          onChangePreferences={() => toggleDialog(true)}
          content={props.bannerContent}
          subContent={props.bannerSubContent}
          actionsBlock={props.bannerActionsBlock}
          textColor={props.bannerTextColor}
          backgroundColor={props.bannerBackgroundColor}
          onAcceptAll={onAcceptAll}
          onDenyAll={onDenyAll}
          hideCloseButton={props.bannerHideCloseButton}
          asModal={props.bannerAsModal}
        />
      )}

      {isDialogOpen && (
        <PreferenceDialog
          customCategories={props.customCategories}
          destinations={props.destinations}
          preferences={props.preferences}
          innerRef={current => (preferenceDialog = { current })}
          onCancel={handleCancel}
          onSave={handleSave}
          onChange={handleCategoryChange}
          marketingDestinations={marketingDestinations}
          advertisingDestinations={advertisingDestinations}
          functionalDestinations={functionalDestinations}
          marketingAndAnalytics={props.preferences.marketingAndAnalytics}
          advertising={props.preferences.advertising}
          functional={props.preferences.functional}
          title={props.preferencesDialogTitle}
          content={props.preferencesDialogContent}
          preferencesDialogTemplate={props.preferencesDialogTemplate}
        />
      )}

      {isCancelling && (
        <CancelDialog
          innerRef={current => (cancelDialog = { current })}
          onBack={handleCancelBack}
          onConfirm={handleCancelConfirm}
          title={props.cancelDialogTitle}
          content={props.cancelDialogContent}
          preferencesDialogTemplate={props.preferencesDialogTemplate}
        />
      )}
    </>
  )
}

export default Container
