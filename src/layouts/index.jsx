import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/extensions
import 'typeface-open-sans';
// eslint-disable-next-line import/extensions
import 'typeface-asul';

import Footer from '../components/Footer';
import config from '../../gatsby-config';
import '../css/global';

require(`prismjs/themes/prism.css`); // eslint-disable-line import/no-extraneous-dependencies

const Template = props => {
  const meta = config.siteMetadata;

  // scroll-to-top fix on page navigation
  const Main = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    justify-content: space-between;
    height: 100vh;
  `;

  return (
    <Main>
      {props.children()}
      <Footer
        email={meta.email}
        twitterHandle={meta.twitterHandle}
        githubHandle={meta.githubHandle}
        linkedinHandle={meta.linkedinHandle}
        facebookAppId={meta.facebookAppId}
      />
    </Main>
  );
};

Template.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Template;
