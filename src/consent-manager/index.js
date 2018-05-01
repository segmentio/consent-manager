import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import ConsentManagerBuilder from '../consent-manager-builder'
import Container from './container'

export default class ConsentManager extends PureComponent {
  static displayName = 'ConsentManager'

  static propTypes = {
    writeKey: PropTypes.string.isRequired,
    otherWriteKeys: PropTypes.arrayOf(PropTypes.string),
    shouldEnforceConsent: PropTypes.func,
  }

  static defaultProps = {
    otherWriteKeys: [],
    shouldEnforceConsent: () => true,
  }

  render() {
    const {writeKey, otherWriteKeys, shouldEnforceConsent} = this.props

    return (
      <ConsentManagerBuilder
        writeKey={writeKey}
        otherWriteKeys={otherWriteKeys}
        shouldEnforceConsent={shouldEnforceConsent}
      >
        {({
          destinations,
          newDestinations,
          preferences,
          setPreferences,
          saveConsent,
        }) => (
          <Container
            destinations={destinations}
            newDestinations={newDestinations}
            preferences={preferences}
            setPreferences={setPreferences}
            saveConsent={saveConsent}
          />
        )}
      </ConsentManagerBuilder>
    )
  }
}
