import { transform } from 'lodash'
import { CategoryPreferences, CustomerPermissions } from '../types'

// Segment preference keys to BC enum taken from consent-manager-config.js
// if there are custom properties, add them to enum as well
enum PreferenceMap {
  functional = 2,
  marketingAndAnalytics = 3,
  advertising = 4
}

function mapCustomerPermissions(
  customerPermissions: CustomerPermissions,
  customerPreference: boolean,
  category: string
): CustomerPermissions {
  if (customerPreference) {
    customerPermissions.allow.push(PreferenceMap[category])
  } else {
    customerPermissions.deny.push(PreferenceMap[category])
  }

  return customerPermissions
}

const getConsentPreferences = (preferenceObj: CategoryPreferences): CustomerPermissions => {
  const res: CustomerPermissions = { allow: [], deny: [] }

  return transform(preferenceObj, mapCustomerPermissions, res)
}

export { getConsentPreferences }
