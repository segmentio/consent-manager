import fetch from 'isomorphic-fetch'
import flatten from 'lodash/flatten'
import sortedUniqBy from 'lodash/sortedUniqBy'
import sortBy from 'lodash/sortBy'
import { Destination } from '../types'

async function fetchDestinationForWriteKey(
  cdnHost: string,
  writeKey: string
): Promise<Destination[]> {
  const res = await fetch(`https://${cdnHost}/v1/projects/${writeKey}/integrations`)

  if (!res.ok) {
    throw new Error(
      `Failed to fetch integrations for write key ${writeKey}: HTTP ${res.status} ${res.statusText}`
    )
  }

  const destinations = await res.json()

  // Rename creationName to id to abstract the weird data model
  for (const destination of destinations) {
    // Because of the legacy Fullstory integration the creationName for this integration is the `name`
    if (destination.name === 'Fullstory (Actions)') {
      destination.id = destination.name
    } else {
      destination.id = destination.creationName
    }
    delete destination.creationName
  }

  return destinations
}

export default async function fetchDestinations(
  cdnHost: string,
  writeKeys: string[]
): Promise<Destination[]> {
  const destinationsRequests: Promise<Destination[]>[] = []
  for (const writeKey of writeKeys) {
    destinationsRequests.push(fetchDestinationForWriteKey(cdnHost, writeKey))
  }

  let destinations = flatten(await Promise.all(destinationsRequests))
  // Remove the dummy Repeater destination
  destinations = destinations.filter(d => d.id !== 'Repeater')
  destinations = sortBy(destinations, ['id'])
  destinations = sortedUniqBy(destinations, 'id')
  return destinations
}
