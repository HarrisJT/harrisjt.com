module.exports = {
  siteMetadata: {
    author: `Harris Thompson`,
    description:
      `Software developer and designer HarrisJT's website.` +
      ` Specializing in performance, UX, and architecture.`,
    facebookAppId: `146038212592206`,
    siteUrl: `https://harrisjt.com`,
    title: `Software Development, Design, and more, by HarrisJT`,
    email: `harris@harrisjt.com`,
    twitterHandle: `harrisjt_`,
    githubHandle: `harrisjt`,
    linkedinHandle: `harristhompson`,
    issueUrl: `https://github.com/harrisjt/harrisjt.com/issues/new`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
              quality: 100,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-react-next`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `HarrisJT`,
        short_name: `HarrisJT`,
        start_url: `/`,
        background_color: `#f9f9ff`,
        theme_color: `#6A7CD8`,
        display: `minimal-ui`,
        icons: [
          {
            src: `/logo-128.png`,
            sizes: `128x128`,
            type: `image/png`,
          },
          {
            src: `/logo-158.png`,
            sizes: `158x158`,
            type: `image/png`,
          },
          {
            src: `/logo-197.png`,
            sizes: `197x197`,
            type: `image/png`,
          },
          {
            src: `/logo-512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: `${__dirname}/static/favicon.png`,
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: true,
        },
      },
    },
    `gatsby-plugin-offline`, // after gatsby-plugin-manifest
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-89144841-1`,
      },
    },
    `gatsby-plugin-netlify`, // make sure to put last in the plugins array
  ],
};
