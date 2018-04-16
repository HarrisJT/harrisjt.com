import Link from 'gatsby-link';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ExternalLink from '../ExternalLink';
import { breakpoints } from '../../css/variables';

const Root = styled.div`
  text-align: center;

  strong {
    margin-top: 1rem;
    font-size: var(--stepOneSmall);
    display: block;

    a {
      font-family: 'Asul', serif;
    }

    @media ${breakpoints.desktop} {
      font-size: var(--stepOneLarge);
    }
  }
`;

/* eslint-disable react/jsx-closing-tag-location */
const PostFooter = props => (
  <Root>
    <em>
      {`Got a question, suggestion, or correction? `}
      <ExternalLink
        to={`https://github.com/harrisjt/harrisjt.com/blob/master/src/${
          props.githubUrl
        }`}>
        Open an Issue
      </ExternalLink>
      .
    </em>
    {props.next && (
      <strong>
        {`Read next: `}
        <Link to={props.next} href={props.next}>
          {props.nextTitle}
        </Link>
      </strong>
    )}
  </Root>
);

/* eslint-enable react/jsx-closing-tag-location */

PostFooter.propTypes = {
  githubUrl: PropTypes.string.isRequired,
  nextTitle: PropTypes.string,
  next: PropTypes.string,
};

PostFooter.defaultProps = {
  nextTitle: null,
  next: null,
};

export default PostFooter;
