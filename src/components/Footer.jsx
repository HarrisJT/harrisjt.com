import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { breakpoints, linkStyle, sizes } from '../css/variables';
import Container from './Container';
import ExternalLink from './ExternalLink';
import ShareButton from './ShareButton';

const Root = styled.div`
  padding: ${sizes.medium} 2rem;
  background-color: rgba(255, 255, 255, 0.45);
  margin-top: 1rem;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);

  @media ${breakpoints.desktop} {
    padding: 2rem ${sizes.large};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li + li {
    margin-top: 1rem;
  }

  a {
    ${linkStyle};
  }
`;

const Info = styled.div`
  margin-top: 2.5rem;
`;

const Footer = props => {
  // Make sure the text is the first param key, the title gets added there
  /* eslint-disable no-undef */
  const twitter = {
    name: `Twitter`,
    shareUrl: `https://twitter.com/intent/tweet/`,
    params: {
      text: ``,
      url: window.location.href,
      via: props.twitterHandle,
    },
  };
  const facebook = {
    name: `Facebook`,
    shareUrl: `https://www.facebook.com/dialog/share`,
    params: {
      quote: ``,
      app_id: props.facebookAppId,
      href: window.location.href,
      display: `popup`,
      redirect_uri: `https://harrisjt.com`,
    },
  };
  const linkedin = {
    name: `LinkedIn`,
    shareUrl: `https://www.linkedin.com/shareArticle`,
    params: {
      title: ``,
      mini: true,
      url: window.location.href,
    },
  };
  /* eslint-enable no-undef */

  return (
    <Root>
      <Container>
        <div>
          {`Share this page on `}
          <ShareButton service={twitter} />
          {`, `}
          <ShareButton service={facebook} />
          {`, or `}
          <ShareButton service={linkedin} />
        </div>

        <Info>
          {`Like my work? Let’s make beautiful things together, contact me on `}
          <ExternalLink to={`https://twitter.com/${props.twitterHandle}`}>
            Twitter
          </ExternalLink>
          {`, `}
          <ExternalLink to={`https://github.com/${props.githubHandle}`}>
            GitHub
          </ExternalLink>
          {`, `}
          <ExternalLink
            to={`https://www.linkedin.com/in/${props.linkedinHandle}`}>
            LinkedIn
          </ExternalLink>
          {`, or `}
          <ExternalLink to={`mailto:${props.email}`}>
            email: {props.email}
          </ExternalLink>
        </Info>
      </Container>
    </Root>
  );
};

Footer.propTypes = {
  twitterHandle: PropTypes.string.isRequired,
  githubHandle: PropTypes.string.isRequired,
  linkedinHandle: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  facebookAppId: PropTypes.string.isRequired,
};

export default Footer;
