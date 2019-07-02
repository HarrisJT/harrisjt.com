import React, {Component} from 'react';
import {graphql} from 'gatsby';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import hex2rgba from 'hex2rgba';
import {colors, fonts} from '../css/variables';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import TitleAndMetaTags from '../components/TitleAndMetaTags';
import {fadeIn, moveUp} from '../css/animations';
import Layout from '../components/Layout';

const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 3vw auto;
  padding: 3vw 0;
  background: #fff;
  max-width: calc(745px + 3vw);
  will-change: opacity;
  animation: ${fadeIn} 450ms cubic-bezier(0.67, 0, 0.67, 1), ${moveUp} 450ms cubic-bezier(0.33, 0, 0, 1);
`;

const Input = styled.input`
  font-size: 2.75em;
  display: block;
  width: 50%;
  border: none;
  border-bottom: 2px solid ${colors.border};
  background-color: transparent;
  outline: none;
  margin-bottom: 1rem;
  ${fonts.body} ::-webkit-input-placeholder {
    opacity: 0.35;
  }

  :-moz-placeholder {
    opacity: 0.35;
  }

  ::-moz-placeholder {
    opacity: 0.35;
  }

  :-ms-input-placeholder {
    opacity: 0.35;
  }
`;

const SearchResultWrapper = styled.div`
  padding: 0 1vw;
  margin: 10px 2vw;
  transition: background-color 100ms ease;

  p {
    color: ${colors.textLight};
    margin: 5px 0 0;
    padding-bottom: 1em;
  }

  &:hover {
    background-color: ${hex2rgba(colors.accentLight, 0.075)};

    h2 {
      opacity: 0.75;
    }
  }
`;

const SearchResultHeader = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;

  h2 {
    margin: 0;
    transition: opacity 100ms ease;
  }

  .date-published {
    color: ${colors.textLight};
  }
`;

const pagesContaining = term => x =>
  x.node.frontmatter.title.toLowerCase().includes(term.toLowerCase()) ||
  x.node.excerpt.toLowerCase().includes(term.toLowerCase()) ||
  !term;

const SearchResults = ({term, pages}) => (
  <React.Fragment>
    {pages
      .filter(pagesContaining(term))
      .map(page => (
        <SearchResultWrapper key={page.node.id}>
          <Link to={page.node.fields.slug}>
            <SearchResultHeader>
              <h2>{page.node.frontmatter.title}</h2>
              {page.node.frontmatter.type === `article` && <span className="dot-separator" />}
              {page.node.frontmatter.type === `article` && (
                <span className="date-published">{page.node.frontmatter.date}</span>
              )}
            </SearchResultHeader>
            <p>{page.node.excerpt}</p>
          </Link>
        </SearchResultWrapper>
      ))
      .slice(0, 15)}
  </React.Fragment>
);

SearchResults.propTypes = {
  term: PropTypes.string,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SearchResults.defaultProps = {
  term: ``,
};

class Search extends Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.object.isRequired,
      site: PropTypes.object.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      term: ``,
    };
    this.pages = this.props.data.allMarkdownRemark.edges;
  }

  handleEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  searchHandler = event => {
    this.setState({
      term: event.target.value,
    });
  };

  render() {
    const {author, description, facebookAppId, title, twitterHandle, siteUrl} = this.props.data.site.siteMetadata;

    return (
      <React.Fragment>
        <TitleAndMetaTags
          author={author}
          description={description}
          searchDescription={`Search – ${description}`}
          facebookAppId={facebookAppId}
          logo={{
            url: `${siteUrl}/logo-share.png`,
            width: 1024,
            height: 1024,
          }}
          publisher={author}
          title={`Search – ${title}`}
          twitterHandle={twitterHandle}
          url={siteUrl}
        />
        <Header />
        <Navigation searchPage />
        <Layout>
          <Form>
            <Input
              type="text"
              aria-label="Search"
              onChange={this.searchHandler}
              onKeyDown={this.handleEnter}
              placeholder="Search..."
              title="Type search term here"
              autoFocus
            />
            <SearchResults term={this.state.term} pages={this.pages} />
          </Form>
        </Layout>
      </React.Fragment>
    );
  }
}

export default Search;

export const pageQuery = graphql`
  query SearchQuery {
    site {
      siteMetadata {
        author
        description
        facebookAppId
        title
        twitterHandle
        siteUrl
        email
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: {frontmatter: {draft: {ne: true}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            type
          }
        }
      }
    }
  }
`;
