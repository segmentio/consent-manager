import React from 'react'
import PropTypes from 'prop-types'
import {Li, Text, Link, Checkbox, Card} from 'evergreen-ui'

export default function Destination({
  destination,
  preferences,
  setPreferences
}) {
  return (
    <Li maxWidth={280} marginRight={20}>
      <Card elevation={1} padding={20} paddingTop={8}>
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
      </Card>
    </Li>
  )
}

Destination.propTypes = {
  destination: PropTypes.object.isRequired,
  preferences: PropTypes.object.isRequired,
  setPreferences: PropTypes.func.isRequired
}
