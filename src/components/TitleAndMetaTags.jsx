import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

const TitleAndMetaTags = props => {
  const tags = [
    { property: `fb:app_id`, content: props.facebookAppId },
    { property: `og:description`, content: props.description },
    { property: `og:image`, content: props.image.url },
    { property: `og:title`, content: props.title },
    { property: `og:type`, content: props.type },
    { property: `og:url`, content: props.url },
    { name: `twitter:card`, content: `summary` },
    { name: `twitter:creator`, content: props.twitterHandle },
    { name: `twitter:site`, content: props.twitterHandle },
    { name: `twitter:title`, content: props.title },
    { name: `twitter:description`, content: props.description },
    { name: `twitter:image`, content: props.image.url },
  ];

  const schemaOrg = {
    article: {
      '@context': `https://schema.org`,
      '@type': `Article`,
      mainEntityOfPage: props.url,
      headline: props.title,
      image: {
        '@type': `ImageObject`,
        ...props.image,
      },
      publisher: {
        '@type': `Organization`,
        name: props.publisher,
        logo: {
          '@type': `ImageObject`,
          ...props.logo,
        },
      },
      author: {
        '@type': `Person`,
        name: props.author,
      },
      description: props.description,
      datePublished: props.datePublished,
    },
    website: {
      '@context': `https://schema.org`,
      '@type': `Organization`,
      url: props.url,
      logo: props.logo.url,
    },
  };

  return (
    <Helmet title={props.title}>
      {tags.map((tag, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <meta {...tag} key={index} />
      ))}

      <link href={props.url} rel="canonical" />

      {schemaOrg[props.type] && (
        <script type="application/ld+json">
          {JSON.stringify(schemaOrg[props.type])}
        </script>
      )}
    </Helmet>
  );
};

TitleAndMetaTags.propTypes = {
  author: PropTypes.string,
  datePublished: PropTypes.string,
  description: PropTypes.string,
  facebookAppId: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  logo: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  publisher: PropTypes.string,
  title: PropTypes.string,
  twitterHandle: PropTypes.string,
  type: PropTypes.oneOf([
    `article`,
    `book`,
    `music.album`,
    `music.playlist`,
    `music.song`,
    `profile`,
    `video.episode`,
    `video.movie`,
    `video.other`,
    `video.tv_show`,
    `website`,
  ]),
  url: PropTypes.string,
};

TitleAndMetaTags.defaultProps = {
  author: null,
  datePublished: null,
  description: `Software Development, Design, and more, by HarrisJT`,
  facebookAppId: null,
  image: {
    url: null,
    width: null,
    height: null,
  },
  logo: {
    url: `https://harrisjt.com/static/logo-share.png`,
    width: 1024,
    height: 1024,
  },
  publisher: `HarrisJT`,
  title: `HarrisJT`,
  twitterHandle: null,
  type: `website`,
  url: `https://harrisjt.com`,
};

export default TitleAndMetaTags;
