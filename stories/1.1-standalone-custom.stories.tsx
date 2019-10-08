import React from 'react'
import { storiesOf } from '@storybook/react'
import { Pane } from 'evergreen-ui'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

// @ts-ignore
import contents from 'raw-loader!./standalone-custom.html'

const StandaloneConsentManagerExample = () => {
  return (
    <Pane display="flex" height="calc(100vh - 10px)">
      <iframe
        frameBorder="0"
        style={{ overflow: 'hidden', height: '100%', width: '100%' }}
        height="100%"
        width="100%"
        srcDoc={contents}
      ></iframe>
      <SyntaxHighlighter language="html" style={docco}>
        {contents}
      </SyntaxHighlighter>
    </Pane>
  )
}

storiesOf('Script Tag', module).add(`Standalone Script Tag with Customization`, () => (
  <StandaloneConsentManagerExample />
))
