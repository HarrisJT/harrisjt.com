import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PostList from '../components/PostList';
import Introduction from '../components/Introduction';
import TitleAndMetaTags from '../components/TitleAndMetaTags';
import { fadeIn, moveRight } from '../css/animations';

const Root = styled.div`
  animation: ${fadeIn} 450ms cubic-bezier(0.67, 0, 0.67, 1),
    ${moveRight} 500ms cubic-bezier(0.33, 0, 0, 1);
`;

const Index = ({ data }) => {
  const meta = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges.map(({ node }) => {
    return {
      date: node.frontmatter.datePublished,
      excerpt: node.excerpt,
      id: node.id,
      titleImage: node.frontmatter.titleImage,
      imageAlt: node.frontmatter.imageAlt,
      path: node.fields.path,
      title: node.frontmatter.title,
      type: node.frontmatter.type,
    };
  });

  return (
    <Root>
      <TitleAndMetaTags
        author={meta.author}
        description={meta.description}
        facebookAppId={meta.facebookAppId}
        image={{
          url: `${meta.siteUrl}/logo-share.png`,
          width: 1024,
          height: 1024,
        }}
        logo={{
          url: `${meta.siteUrl}/logo-share.png`,
          width: 1024,
          height: 1024,
        }}
        publisher={meta.title}
        title={meta.title}
        twitterHandle={meta.twitterHandle}
        type="website"
        url={meta.siteUrl}
      />
      <Introduction email={meta.email} />
      <PostList posts={posts} />
    </Root>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object.isRequired,
    site: PropTypes.object.isRequired,
  }).isRequired,
};

export default Index;

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
      sort: {order: DESC, fields: [frontmatter___datePublished]}
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            path
          }
          frontmatter {
            datePublished(formatString: "MMMM DD, YYYY")
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
