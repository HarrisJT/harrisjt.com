import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Container from './Container';
import { breakpoints, linkStyle, sizes } from '../css/variables';

const Root = styled.div`
  padding: ${sizes.medium} 1.5rem 0;
  margin-bottom: 1rem;

  @media ${breakpoints.desktop} {
    padding: ${sizes.medium} ${sizes.large} 0;
    margin-bottom: 0.5rem;
  }
`;

const Info = styled.p`
  font-size: 1.2rem;
  margin: 0;

  a {
    ${linkStyle};
  }
`;

const Introduction = props => (
  <Root>
    <Container>
      <h1>Hello,</h1>
      <Info>
        {`My name is Harris, I'm a software developer and designer studying
        computer science at the University of Wisconsin. I enjoy creating
        engaging digital experiences that build meaningful connections for clients and customers.
         Contact me: `}
        <a href={`mailto:${props.email}`}>{props.email}</a>
      </Info>
    </Container>
  </Root>
);

Introduction.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Introduction;
