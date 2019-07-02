import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {GlobalStyle} from '../../css/globalStyle';
import Footer from '../Footer/Footer';
import {useSiteMetadata} from '../../utils/useSiteMetadata';

// scroll-to-top fix on page navigation
const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  height: 100vh;
`;

const Layout = ({children}) => {
  const {email, twitterHandle, githubHandle, linkedinHandle, facebookAppId} = useSiteMetadata();

  return (
    <React.Fragment>
      <GlobalStyle />
      <Main>
        {children}
        <Footer
          email={email}
          twitterHandle={twitterHandle}
          githubHandle={githubHandle}
          linkedinHandle={linkedinHandle}
          facebookAppId={facebookAppId}
        />
      </Main>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
