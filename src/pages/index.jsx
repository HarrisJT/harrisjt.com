import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import styled from 'styled-components';
import PostList from '../components/PostList';
import Introduction from '../components/Introduction';
import TitleAndMetaTags from '../components/TitleAndMetaTags';
import Layout from '../components/Layout';
import {fadeIn, moveRight} from '../css/animations';

const Root = styled.div`
  animation: ${fadeIn} 450ms cubic-bezier(0.67, 0, 0.67, 1), ${moveRight} 500ms cubic-bezier(0.33, 0, 0, 1);
`;

class Home extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array.isRequired,
      }),
      site: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    const {data} = this.props;

    const {author, description, facebookAppId, siteUrl, title, twitterHandle, email} = data.site.siteMetadata;

    const posts = data.allMarkdownRemark.edges.map(({node}) => ({
      date: node.frontmatter.date,
      excerpt: node.excerpt,
      id: node.id,
      titleImage: node.frontmatter.titleImage,
      imageAlt: node.frontmatter.imageAlt,
      path: node.fields.path,
      title: node.frontmatter.title,
      type: node.frontmatter.type,
    }));

    return (
      <Layout>
        <Root>
          <TitleAndMetaTags
            author={author}
            description={description}
            facebookAppId={facebookAppId}
            image={{
              url: `${siteUrl}/logo-share.png`,
              width: 1024,
              height: 1024,
            }}
            logo={{
              url: `${siteUrl}/logo-share.png`,
              width: 1024,
              height: 1024,
            }}
            publisher={title}
            title={title}
            twitterHandle={twitterHandle}
            type="website"
            url={siteUrl}
          />
          <Introduction email={email} />
          <PostList posts={posts} />
        </Root>
      </Layout>
    );
  }
}

export default Home;

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query getPosts {
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
      limit: 100
      filter: {frontmatter: {draft: {ne: true}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            path
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            imageAlt
            title
            titleImage {
              childImageSharp {
                resize(quality: 100, width: 550) {
                  src
                }
              }
            }
            type
          }
        }
      }
    }
  }
`;
