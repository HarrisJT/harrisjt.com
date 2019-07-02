import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';

import hex2rgba from 'hex2rgba';
import PostFooter from '../components/PostFooter';
import Navigation from '../components/Navigation';
import TitleAndMetaTags from '../components/TitleAndMetaTags';
import Header from '../components/Header';
import {colors, linkStyle, sizes} from '../css/variables';
import {fadeIn, moveUp} from '../css/animations';
import PostHeader from '../components/PostHeader';
import {useSiteMetadata} from '../utils/useSiteMetadata';
import Layout from '../components/Layout';

const PostContainer = styled.article`
  margin: ${sizes.small} auto;
  padding: ${sizes.small};
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 4px 6px ${hex2rgba(colors.accent, 0.075)}, 0 1px 3px rgba(0, 0, 0, 0.075);
  max-width: calc(745px + ${sizes.small});
  will-change: opacity;
  animation: ${fadeIn} 400ms cubic-bezier(0.67, 0, 0.67, 1), ${moveUp} 450ms cubic-bezier(0.33, 0, 0, 1);

  a {
    ${linkStyle};
  }
`;

const PostContent = styled.div`
  img {
    max-width: 650px;
  }

  &:after {
    display: block;
    content: '';
    width: 6px;
    height: 6px;
    margin: 2.25rem auto;
    border-radius: 50%;
    background: ${colors.accentDark};
    box-shadow: calc(6px * 5) 0 0 0 ${colors.accentDark}, calc(6px * -5) 0 0 0 ${colors.accentDark};
  }
`;

const Post = ({data, pathContext}) => {
  const post = data.markdownRemark;
  const {author, description, facebookAppId, title, twitterHandle, siteUrl, issueUrl} = useSiteMetadata();
  const seoImage = siteUrl + post.frontmatter.seoImage.childImageSharp.resize.src;

  const prev = pathContext.prev ? pathContext.prev.fields.path : null;
  const next = pathContext.next ? pathContext.next.fields.path : null;
  const nextTitle = next ? pathContext.next.frontmatter.title : null;

  return (
    <React.Fragment>
      <TitleAndMetaTags
        author={author}
        date={post.frontmatter.date}
        description={description}
        facebookAppId={facebookAppId}
        image={{url: seoImage, width: 800, height: 600}}
        logo={{
          url: `${siteUrl}/logo-share.png`,
          width: 1024,
          height: 1024,
        }}
        publisher={author}
        searchDescription={post.excerpt}
        title={`${post.frontmatter.title} – ${title}`}
        twitterHandle={twitterHandle}
        type="article"
        url={siteUrl + post.fields.path}
      />
      <Header />
      <Navigation previous={prev} next={next} />
      <Layout>
        <PostContainer>
          <PostHeader
            title={post.frontmatter.title}
            type={post.frontmatter.type}
            date={post.frontmatter.date}
            dateModified={post.frontmatter.dateModified ? post.frontmatter.dateModified : null}
            timeToRead={post.timeToRead ? post.timeToRead : null}
            role={post.frontmatter.role ? post.frontmatter.role : null}
          />
          <PostContent dangerouslySetInnerHTML={{__html: post.html}} />
          <PostFooter
            nextTitle={nextTitle}
            next={next}
            issueUrl={issueUrl}
            githubUrl={post.fileAbsolutePath.split(`/src/`)[1]}
          />
        </PostContainer>
      </Layout>
    </React.Fragment>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object.isRequired,
  }).isRequired,
  pathContext: PropTypes.shape({
    prev: PropTypes.object,
    next: PropTypes.object,
  }).isRequired,
};

export default Post;

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      fileAbsolutePath
      html
      timeToRead
      excerpt(pruneLength: 250)
      fields {
        path
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        dateModified(formatString: "MMMM DD, YYYY")
        role
        seoImage {
          childImageSharp {
            resize(quality: 100, width: 1000) {
              src
            }
          }
        }
        title
        type
      }
    }
  }
`;
