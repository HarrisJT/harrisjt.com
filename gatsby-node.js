const path = require(`path`);

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  let slug = null;

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    if (parsedFilePath.dir === ``) {
      slug = parsedFilePath.name;
    } else {
      slug = parsedFilePath.dir;
    }

    createNodeField({ node, name: `path`, value: `/${slug}` });
    createNodeField({ node, name: `slug`, value: slug });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postComponent = path.resolve(`./src/templates/Post.jsx`);
    const query = graphql(`
      {
        allMarkdownRemark(
          filter: {frontmatter: {draft: {ne: true}}}
          sort: {order: DESC, fields: [frontmatter___datePublished]}
        ) {
          edges {
            node {
              fields {
                path
                slug
              }
              frontmatter {
                title
                type
              }
            }
          }
        }
      }
    `);

    resolve(
      query.then(result => {
        if (result.errors) {
          // eslint-disable-next-line no-console
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;

        const articles = posts.filter(
          edge => edge.node.frontmatter.type === `article`,
        );
        const projects = posts.filter(
          edge => edge.node.frontmatter.type === `project`,
        );

        articles.forEach(({ node }, index) => {
          createPage({
            path: node.fields.slug, // required
            component: postComponent,
            context: {
              slug: node.fields.slug,
              prev: index === 0 ? null : articles[index - 1].node,
              next:
                index === articles.length - 1 ? null : articles[index + 1].node,
            },
          });
        });

        projects.forEach(({ node }, index) => {
          createPage({
            path: node.fields.slug, // required
            component: postComponent,
            context: {
              slug: node.fields.slug,
              prev: index === 0 ? null : projects[index - 1].node,
              next:
                index === projects.length - 1 ? null : projects[index + 1].node,
            },
          });
        });
      }),
    );
  });
};
