import React from 'react'
import { storiesOf } from '@storybook/react'
import { Pane, Pre } from 'evergreen-ui'
// @ts-ignore
import contents from 'raw-loader!./standalone.html'

const StandaloneConsentManagerExample = () => {
  return (
    <Pane display="flex">
      <iframe width="100%" height="500" srcDoc={contents}></iframe>
      <Pre>{contents}</Pre>
    </Pane>
  )
}

storiesOf('Standalone', module).add(`Standalone Script Tag`, () => (
  <StandaloneConsentManagerExample />
))
