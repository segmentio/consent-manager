import fetch from 'isomorphic-fetch'

export default async function fetchDestinations(writeKey) {
  const res = await fetch(
    `http://localhost:3000/v1/projects/${writeKey}/integrations`
  )

  if (!res.ok) {
    throw new Error(
      `Failed to fetch analytics.js integrations: HTTP ${res.status} ${
        res.statusText
      }`
    )
  }

  const destinations = await res.json()

  for (const destination of destinations) {
    destination.id = destination.creationName
    delete destination.creationName
  }

  destinations.push({
    id: 'Segment.io',
    name: 'Segment',
    category: 'Segment',
    description:
      'Segment is trusted by thousands of companies as their Customer Data Platform. Collect user data with one API and send it to hundreds of tools or a data warehouse.',
    website: 'https://segment.com',
  })

  return destinations
}
