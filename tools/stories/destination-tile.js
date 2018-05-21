import React from 'react'
import PropTypes from 'prop-types'
import {Li, Text, Link, Checkbox} from 'evergreen-ui'

export default function Destination({
  destination,
  preferences,
  setPreferences
}) {
  return (
    <Li maxWidth={300}>
      <Checkbox
        label={
          <Link href={destination.website} target="_blank">
            {destination.name}
          </Link>
        }
        checked={Boolean(preferences[destination.id])}
        onChange={() =>
          setPreferences({
            [destination.id]: !preferences[destination.id]
          })
        }
      />
      <Text display="block" size={300}>
        {destination.description}
      </Text>
    </Li>
  )
}

Destination.propTypes = {
  destination: PropTypes.object.isRequired,
  preferences: PropTypes.object.isRequired,
  setPreferences: PropTypes.func.isRequired
}
