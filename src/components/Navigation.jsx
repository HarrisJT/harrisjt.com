import Link from 'gatsby-link';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from '../css/variables';

const Root = styled.div`
  position: fixed;
  top: 2.75rem;
  right: 2.75rem;
  z-index: 1;

  .icon {
    display: inline-flex;
    align-items: center;
    margin: 0;
  }
`;

const Anchor = styled(Link)`
  display: inline-block;
  padding: 0.25rem 0.425rem;
  transition: all 0.05s ease;

  &:hover svg {
    fill: ${colors.accentLight};
    transform: translateY(-1px);
  }

  &:active svg {
    fill: ${colors.accentDark};
    transform: translateY(1px);
  }
`;

/* eslint-disable max-len, react/jsx-closing-tag-location */
const Navigation = props => (
  <Root>
    {props.previous && (
      <Anchor
        to={props.previous}
        aria-label="Navigate to previous page"
        title="Navigate to previous post">
        <figure className="icon">
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="1.414"
            fill={colors.accent}>
            <path
              d="M6.021 12.288c.063.742.4 1.463 1.002 1.995l7.315 6.466a.999.999 0 1 0 1.324-1.498l-7.314-6.466a1 1 0 0 1-.004-1.495l7.322-6.544a1 1 0 1 0-1.332-1.492L7.011 9.799a2.985 2.985 0 0 0-.969 1.797 1.905 1.905 0 0 0-.021.692z"
              fillRule="nonzero"
            />
          </svg>
        </figure>
      </Anchor>
    )}
    <Anchor
      to="/"
      aria-label="Navigate to homepage"
      title="Navigate to homepage">
      <figure className="icon">
        <svg
          width="22px"
          height="22px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="1.414"
          fill={colors.accent}>
          <path
            d="M16 20.5h2a2 2 0 0 0 2-2V9.908c0-.638-.304-1.237-.818-1.614l-6-4.394a1.999 1.999 0 0 0-2.364 0l-6 4.394A2.001 2.001 0 0 0 4 9.908V18.5a2 2 0 0 0 2 2h2v-8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v8zm-2 0v-7h-4v7h4zM3.636 6.681l6-4.395a4 4 0 0 1 4.728 0l6 4.395A4 4 0 0 1 22 9.908V18.5a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9.908a4 4 0 0 1 1.636-3.227z"
            fillRule="nonzero"
          />
        </svg>
      </figure>
    </Anchor>
    {!props.searchPage && (
      <Anchor
        to="/search"
        aria-label="Navigate to search page"
        title="Navigate to search page">
        <figure className="icon">
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="1.414"
            fill={colors.accent}>
            <path
              d="M17.813 16.399l4.598 4.597c.39.391.39 1.024 0 1.415-.391.39-1.024.39-1.415 0l-4.597-4.598a8.961 8.961 0 0 1-5.618 1.968 9 9 0 1 1 9-9 8.961 8.961 0 0 1-1.968 5.618zm-7.032 1.382a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"
              fillRule="nonzero"
            />
          </svg>
        </figure>
      </Anchor>
    )}
    {props.next && (
      <Anchor
        to={props.next}
        aria-label="Navigate to next page"
        title="Navigate to next post">
        <figure className="icon">
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="1.414"
            fill={colors.accent}>
            <path
              d="M8.338 4.749l7.322 6.466a1 1 0 0 1 .004 1.495l-7.33 6.544a1.001 1.001 0 0 0 1.334 1.492l7.33-6.545a2.998 2.998 0 0 0-.012-4.484L9.664 3.251a1.001 1.001 0 0 0-1.326 1.498z"
              fillRule="nonzero"
            />
          </svg>
        </figure>
      </Anchor>
    )}
  </Root>
);
/* eslint-enable max-len, react/jsx-closing-tag-location */

Navigation.propTypes = {
  previous: PropTypes.string,
  next: PropTypes.string,
  searchPage: PropTypes.bool,
};

Navigation.defaultProps = {
  previous: null,
  next: null,
  searchPage: false,
};

export default Navigation;
