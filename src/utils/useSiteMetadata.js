import {graphql, useStaticQuery} from 'gatsby';

export const useSiteMetadata = () => {
  const {site} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            twitterHandle
            githubHandle
            linkedinHandle
            facebookAppId
            author
            description
            siteUrl
            title
            twitterHandle
            email
          }
        }
      }
    `
  );
  return site.siteMetadata;
};
