import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

let stylesStr;
if (process.env.NODE_ENV === `production`) {
  try {
    // eslint-disable-next-line global-require
    stylesStr = require(`!raw-loader!../public/styles.css`);
  } catch (error) {
    console.log(error);
  }
}

export default class HTML extends PureComponent {
  static propTypes = {
    body: PropTypes.node.isRequired,
    headComponents: PropTypes.node.isRequired,
    postBodyComponents: PropTypes.node.isRequired,
  };

  render() {
    const {body, headComponents, postBodyComponents} = this.props;

    let css;
    if (process.env.NODE_ENV === `production`) {
      css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{__html: stylesStr}} />;
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />

          {headComponents}

          <meta name="apple-mobile-web-app-title" content="harrisjt" />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          {css}
        </head>
        <body>
          <div dangerouslySetInnerHTML={{__html: body}} id="___gatsby" />
          {postBodyComponents}
        </body>
      </html>
    );
  }
}
