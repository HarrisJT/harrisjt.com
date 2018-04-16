import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

import Container from '../components/Container';
import TitleAndMetaTags from '../components/TitleAndMetaTags';
import Header from '../components/Header';
import { linkStyle, sizes } from '../css/variables';

const InfoContainer = styled(Container)`
  margin: ${sizes.small} auto;
  padding: ${sizes.small};

  h1 {
    text-align: center;
    margin-bottom: 1.25rem;
  }

  a {
    ${linkStyle};
  }
`;

const PageNotFound = () => (
  <div>
    <Header />
    <TitleAndMetaTags title="Page Not Found – HarrisJT" />
    <InfoContainer>
      <h1>Page Not Found</h1>
      <p>
        I couldn&apos;t find what you were looking for. Try using the&nbsp;
        <Link to="/search" href="/search">
          search page
        </Link>
        {` or the `}
        <Link to="/" href="/">
          home page
        </Link>.
      </p>
      <em>
        Please contact the owner of the site that linked you to this URL and let
        them know that their link is broken.
      </em>
    </InfoContainer>
  </div>
);

export default PageNotFound;
