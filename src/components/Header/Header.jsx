import Link from 'gatsby-link';
import React from 'react';
import styled from 'styled-components';
import logo from '../../../static/logo-header.svg';

import {breakpoints, colors, sizes} from '../../css/variables';

const Root = styled.header`
  overflow: hidden;
  padding-left: ${sizes.medium};
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.45);
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);

  @media ${breakpoints.desktop} {
    padding-left: ${sizes.large};
  }

  div {
    margin-left: 6px;
  }

  span {
    font-weight: 700;
  }

  p {
    color: ${colors.textLight};
    margin: 0;
    font-size: 0.9rem;
  }

  img {
    padding: 20px 5px;
    width: 120px;
  }
`;

const Title = styled.h1`
  font-size: 1.35rem;
  margin: 0;
  white-space: nowrap;
  color: ${colors.headingText};
`;

export default function Header() {
  return (
    <Root>
      <Link href="/" to="/" role="button" aria-label="Navigate to homepage">
        <img src={logo} alt="harrisjt logo" />
      </Link>
      <Link href="/" to="/">
        <div>
          <Title>
            Harris<span>Thompson</span>
          </Title>
          <p>Developer & Designer</p>
        </div>
      </Link>
    </Root>
  );
}
