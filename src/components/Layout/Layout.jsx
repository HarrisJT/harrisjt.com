import React, {PureComponent} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {GlobalStyle} from '../../css/globalStyle';
import Footer from '../Footer/Footer';
import {useSiteMetadata} from '../../utils/useSiteMetadata';

class Template extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const {children} = this.props;
    const {email, twitterHandle, githubHandle, linkedinHandle, facebookAppId} = useSiteMetadata();

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
      <React.Fragment>
        <GlobalStyle />
        <Main>{children}</Main>
        <Footer
          email={email}
          twitterHandle={twitterHandle}
          githubHandle={githubHandle}
          linkedinHandle={linkedinHandle}
          facebookAppId={facebookAppId}
        />
      </React.Fragment>
    );
  }
}

export default Template;
