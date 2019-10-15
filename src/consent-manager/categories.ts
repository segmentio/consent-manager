import { Destination } from '../types'

export const MARKETING_AND_ANALYTICS_CATEGORIES = [
  'A/B Testing',
  'Analytics',
  'Attribution',
  'Email',
  'Enrichment',
  'Heatmaps & Recordings',
  'Raw Data',
  'Realtime Dashboards',
  'Referrals',
  'Surveys',
  'Video'
]

export const ADVERTISING_CATEGORIES = ['Advertising', 'Tag Managers']

export const FUNCTIONAL_CATEGORIES = [
  'CRM',
  'Customer Success',
  'Deep Linking',
  'Helpdesk',
  'Livechat',
  'Performance Monitoring',
  'Personalization',
  'SMS & Push Notifications',
  'Security & Fraud'
]

export interface DestinationCategory {
  name: string
  key: string
  destinations: Destination[]
  description: string
  example: string
}

export function categorize(destinations: Destination[]): DestinationCategory[] {
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

  return [
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
}
