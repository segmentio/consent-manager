import React from 'react'
import { storiesOf } from '@storybook/react'
import { Pane } from 'evergreen-ui'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

// @ts-ignore
import contents from 'raw-loader!./standalone.html'
import CookieView from './components/CookieView'

const StandaloneConsentManagerExample = () => {
  return (
    <>
      <Pane display="flex" height="calc(100vh - 10px)">
        <iframe
          frameBorder="0"
          style={{ overflow: 'hidden', height: '100%', width: '550px', flex: 1 }}
          height="100%"
          width="550"
          srcDoc={contents}
        ></iframe>
        <SyntaxHighlighter language="html" style={docco} customStyle={{ flex: 1 }}>
          {contents}
        </SyntaxHighlighter>
      </Pane>

      <CookieView />
    </>
  )
}

storiesOf('Standalone / Tag', module).add(`Basic`, () => <StandaloneConsentManagerExample />)
