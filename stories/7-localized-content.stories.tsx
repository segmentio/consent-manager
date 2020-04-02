import React from 'react'
import { Pane, Heading, Paragraph } from 'evergreen-ui'
import { ConsentManager } from '../src'
import { storiesOf } from '@storybook/react'
import CookieView from './components/CookieView'
import inRegions from '@segment/in-regions'
import { CloseBehavior } from '../src/consent-manager/container'

const ConsentManagerExample = () => {
  const shouldRequireConsent = inRegions(['CA', 'EU'])
  const initialPreferences = {
    advertising: false,
    marketingAndAnalytics: false,
    functional: false,
  }
  const closeBehavior = CloseBehavior.DENY

  const banner = {
    header: 'Cookies auf Beispiel',
    content:
      'Wir verwenden Cookies für ein komfortableres Nutzererlebnis und zu Analyse- und Marketing-zwecken. Du kannst diese Cookies jederzeit deaktivieren.',
  }
  const preference = {
    description:
      'Segment verwendet Daten, die von Cookies und JavaScript-Bibliotheken gesammelt wurden, um Ihr Surf-Erlebnis zu verbessern, den Website-Verkehr zu analysieren, personalisierte Werbung zu liefern und die Gesamtleistung unserer Website zu steigern.',
    warning:
      'Durch die Nutzung unserer Website stimmen Sie unserer Richtlinie zur Website-Datenerfassung zu.',
    explanation:
      'Die nachstehende Tabelle gibt einen Überblick über die Verwendung dieser Daten nach Kategorien. Um eine Kategorie der Datenerhebung abzulehnen, wählen Sie "Nein" und speichern Sie Ihre Präferenzen.',
  }

  const translations = {
    de: {
      'ui.save': 'Speichern',
      'ui.cancel': 'Abbrechen',
      'ui.yes': 'Ja',
      'ui.no': 'Nein',
      'ui.not_available': 'NICHT VERFÜGBAR',
      'ui.go_back': 'Zurückgehen',
      'ui.yes_cancel': 'Ja, abbrechen',
      'ui.header.allow': 'Erlauben',
      'ui.header.category': 'Kategorie',
      'ui.header.purpose': 'Zweck',
      'ui.header.tools': 'Werkzeuge',
      'ui.banner.content': React.createElement(React.Fragment, null, [
        React.createElement('strong', null, banner.header),
        React.createElement('div', null, banner.content),
      ]),
      'ui.banner.subContent': 'INFORMATIONEN & EINSTELLUNGEN',
      'ui.preferences.title': 'Website-Datenerhebungs-Präferenzen',
      'ui.preferences.content': React.createElement(React.Fragment, null, [
        React.createElement('p', null, preference.description),
        React.createElement('p', null, preference.warning),
        React.createElement('p', null, preference.explanation),
      ]),
      'ui.cancel.title': 'Sind Sie sicher, dass Sie absagen wollen?',
      'ui.cancel.content':
        'Ihre Einstellungen wurden nicht gespeichert. Wenn Sie unsere Website weiterhin nutzen, stimmen Sie unserer Richtlinie zur Datenerfassung auf der Website zu.',
      'aria.functional.allow': 'Funktionales Verfolgung erlauben',
      'aria.functional.disallow': 'Funktionale Verfolgung verbieten',
      'aria.marketing.allow': 'Marketing und Analyse-Verfolgung erlauben',
      'aria.marketing.disallow': 'Marketing und Analyse-Verfolgung verbieten',
      'aria.advertising.allow': 'Werbetracking erlauben',
      'aria.advertising.disallow': 'Werbetracking verbieten',
      'category.functional': 'Funktionell',
      'category.marketing': 'Marketing und Analytik',
      'category.advertising': 'Werbung',
      'category.essential': 'Wesentlich',
      'purpose.functional.explanation':
        'Um die Leistung unserer Website zu überwachen und Ihr Surf-Erlebnis zu verbessern.',
      'purpose.functional.example':
        'Zum Beispiel können Sie mit diesen Tools mit uns per Live-Chat kommunizieren.',
      'purpose.marketing.explanation':
        'Um das Nutzerverhalten zu verstehen, um Ihnen ein relevanteres Browsing-Erlebnis zu bieten oder den Inhalt unserer Website zu personalisieren.',
      'purpose.marketing.example':
        'Zum Beispiel sammeln wir Informationen darüber, welche Seiten Sie besuchen, um uns zu helfen, relevantere Informationen zu präsentieren',
      'purpose.advertising.explanation':
        'Um die Wirksamkeit der Werbung auf unserer und anderen Websites zu personalisieren und zu messen.',
      'purpose.advertising.example':
        'Wir können Ihnen beispielsweise eine personalisierte Werbung auf der Grundlage der von Ihnen besuchten Seiten auf unserer Website anbieten.',
      'purpose.essential.explanation':
        'Wir verwenden Browser-Cookies, die notwendig sind, damit die Site wie beabsichtigt funktioniert.',
      'purpose.essential.example':
        'Wir speichern zum Beispiel Ihre Präferenzen für die Datenerfassung auf der Website, damit wir sie berücksichtigen können, wenn Sie zu unserer Website zurückkehren. Sie können diese Cookies in Ihren Browsereinstellungen deaktivieren, aber wenn Sie das tun, funktioniert die Website möglicherweise nicht wie beabsichtigt.',
    },
  }
  return (
    <Pane>
      <ConsentManager
        writeKey="tYQQPcY78Hc3T1hXUYk0n4xcbEHnN7r0"
        otherWriteKeys={['vMRS7xbsjH97Bb2PeKbEKvYDvgMm5T3l']}
        closeBehavior={closeBehavior}
        shouldRequireConsent={shouldRequireConsent}
        initialPreferences={initialPreferences}
        locale="de"
        translations={translations}
      />

      <Pane marginX={100} marginTop={20}>
        <Heading> Cute Cats </Heading>
        <Pane display="flex">
          <iframe
            src="https://giphy.com/embed/JIX9t2j0ZTN9S"
            width="480"
            height="480"
            frameBorder="0"
          />

          <iframe
            src="https://giphy.com/embed/yFQ0ywscgobJK"
            width="398"
            height="480"
            frameBorder="0"
          />
        </Pane>

        <Paragraph marginTop={20}>
          This example highlights how you can create define a localization ('de'), and then set that
          locale in ConsentManager.
        </Paragraph>
      </Pane>
      <CookieView />
    </Pane>
  )
}

storiesOf('Localized Content Example', module).add(`Basic`, () => <ConsentManagerExample />)
