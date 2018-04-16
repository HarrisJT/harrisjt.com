import React from 'react'
import PropTypes from 'prop-types'

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

const HTML = props => {
  let css
  if (process.env.NODE_ENV === `production`) {
    css = (
      <style
        id="gatsby-inlined-css"
        dangerouslySetInnerHTML={{ __html: stylesStr }}
      />
    )
  }
  return (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {props.headComponents}

      <meta name="apple-mobile-web-app-title" content="harrisjt" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      {css}
    </head>
    <body>
      <div dangerouslySetInnerHTML={{ __html: props.body }} id="___gatsby" />
      {props.postBodyComponents}
    </body>
  </html>
  )
};

HTML.propTypes = {
  body: PropTypes.node.isRequired,
  headComponents: PropTypes.node.isRequired,
  postBodyComponents: PropTypes.node.isRequired,
};

export default HTML;
