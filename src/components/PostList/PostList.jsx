import Link from 'gatsby-link';
import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import hex2rgba from 'hex2rgba';
import {breakpoints, colors, fonts, sizes} from '../../css/variables';
import integerToRoman from '../../utils/convertIntegerToRoman';

const ButtonContainer = styled.div`
  padding: 1.5vw 1.5rem;
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 50%;

  @media ${breakpoints.desktop} {
    padding: 1.5vw ${sizes.large};
  }
`;

const Button = styled.button`
  flex-shrink: 0;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  background-color: ${colors.accent};
  color: #fff;
  box-shadow: 0 4px 6px ${hex2rgba(colors.accent, 0.15)}, 0 1px 3px rgba(0, 0, 0, 0.075);
  padding: 0 30px;
  height: 45px;
  letter-spacing: 0.055em;
  line-height: 45px;
  white-space: nowrap;
  user-select: none;
  transition: all 100ms ease;

  &:first-child {
    margin-left: 0;
  }

  &:hover,
  &:focus {
    background-color: ${colors.accentLight};
    transform: translateY(-1px);
    box-shadow: 0 7px 14px ${hex2rgba(colors.accentLight, 0.1)}, 0 3px 6px rgba(0, 0, 0, 0.075);
    outline: none;
  }

  &:active,
  &.active {
    color: ${hex2rgba(`#ffffff`, 0.9)};
    background-color: ${colors.accentDark};
    transform: translateY(1px);
    box-shadow: 0 4px 6px ${hex2rgba(colors.accentDark, 0.15)}, 0 1px 3px rgba(0, 0, 0, 0.075);
  }
`;

const SearchButton = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0 0 0 20px;
  line-height: 0;
  transition: all 50ms ease;

  &:hover svg {
    fill: ${colors.accentLight};
    transform: translateY(-1px);
  }

  &:active svg {
    fill: ${colors.accentDark};
    transform: translateY(1px);
  }

  @media ${breakpoints.mobile} {
    display: none;
  }
`;

const List = styled.ul`
  padding: 0;
  margin: 0 0 ${sizes.large} 0;
  list-style: none;
`;

const Item = styled(Link)`
  ${fonts.heading};
  line-height: 1.2;
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 1.2rem 1.5rem;
  transition: background-color 100ms ease;

  figure {
    position: absolute;
    top: -${sizes.medium};
    right: ${sizes.large};
    margin: 0;
    pointer-events: none;
    opacity: 0;
    display: none;
    z-index: 1;
    will-change: opacity;
    transition: opacity 100ms ease;

    img {
      height: 100%;
      border: 1px solid ${colors.border};
    }

    @media ${breakpoints.desktop} {
      display: block;
    }

    @media only screen and (max-width: 1650px) {
      img {
        width: 25vw;
      }
      right: ${sizes.medium};
    }
  }

  div,
  p {
    transition: transform 75ms cubic-bezier(0.23, 0.5, 0.37, 1);
  }

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    font-size: 1.325rem;

    .date-published {
      color: ${colors.textLight};
      font-family: 'Open Sans', serif;
    }
  }

  p {
    ${fonts.body};
    max-width: 745px;
    margin: 0.5rem 0 0;
  }

  &:hover {
    background-color: ${hex2rgba(colors.accentLight, 0.065)};

    div,
    p {
      transform: translateX(6px);
    }

    figure {
      opacity: 1;
    }
  }

  @media ${breakpoints.desktop} {
    padding: 1.2rem ${sizes.large};
  }
`;

const Index = styled.span`
  color: ${colors.textLight};
  display: inline-block;
  margin-right: 0.6rem;
`;

const Title = styled.h2`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  font-size: 1.325rem;
`;

/* eslint-disable react/jsx-closing-tag-location */
const ResultItem = ({post, index}) => (
  <Item to={post.path}>
    <figure>
      <img src={post.titleImage.childImageSharp.resize.src} alt={post.imageAlt} />
    </figure>
    <div>
      <Index>{integerToRoman(index + 1)}</Index>
      <Title>{post.title}</Title>
      {post.type === `article` && <span className="dot-separator" />}
      {post.type === `article` && <small className="date-published">{post.date}</small>}
    </div>
    <p>{post.excerpt}</p>
  </Item>
);
/* eslint-enable react/jsx-closing-tag-location */

ResultItem.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string,
    excerpt: PropTypes.string,
    titleImage: PropTypes.object,
    imageAlt: PropTypes.string,
    path: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};

ResultItem.defaultProps = {
  index: 0,
};

/* eslint-disable react/jsx-closing-tag-location */
const ResultList = ({category, posts}) => (
  <List>
    {posts
      .filter(post => post.type === category)
      .map((post, index) => (
        <li key={post.id}>
          <ResultItem post={post} index={index} />
        </li>
      ))}
  </List>
);
/* eslint-enable react/jsx-closing-tag-location */

ResultList.propTypes = {
  category: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCategory: `project`,
    };
    this.setCategory = this.setCategory.bind(this);
  }

  setCategory(category) {
    this.setState({
      displayCategory: category,
    });
  }

  render() {
    return (
      <div>
        <ButtonContainer>
          <Button
            className={this.state.displayCategory === `project` ? `active` : null}
            aria-pressed={this.state.displayCategory === `project`}
            aria-label="List all projects"
            onClick={() => this.setCategory(`project`)}>
            {`Projects`}
          </Button>

          <Button
            className={this.state.displayCategory === `article` ? `active` : null}
            aria-pressed={this.state.displayCategory === `article`}
            aria-label="List all articles"
            onClick={() => this.setCategory(`article`)}>
            {`Articles`}
          </Button>

          <SearchButton role="button" aria-label="Navigate to search page" title="Navigate to search page" to="search">
            <svg
              width="25px"
              height="25px"
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
          </SearchButton>
        </ButtonContainer>
        <ResultList category={this.state.displayCategory} posts={this.props.posts} />
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostList;
