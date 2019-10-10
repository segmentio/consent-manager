import React, { useEffect, useState } from 'react'
import { Pane, Heading, Button } from 'evergreen-ui'
import cookies from 'js-cookie'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'

const CookieView = () => {
  const [cookieVal, updateCookieVal] = useState(cookies.getJSON())

  useEffect(() => {
    const clear = setInterval(() => {
      updateCookieVal(cookies.getJSON())
    }, 1000)
    return () => clearInterval(clear)
  })

  return (
    <Pane marginTop={30}>
      <Heading>Cookies:</Heading>
      <SyntaxHighlighter language="json" style={docco}>
        {JSON.stringify(cookieVal, null, 2)}
      </SyntaxHighlighter>

      <Button
        onClick={() => {
          const allCookies = cookies.getJSON()
          Object.keys(allCookies).forEach(key => {
            cookies.remove(key)
          })
          window.location.reload()
        }}
      >
        Clear 🧹🍪
      </Button>
    </Pane>
  )
}

export default CookieView
