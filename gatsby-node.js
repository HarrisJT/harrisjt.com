const path = require('path');

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const {permalink} = node.frontmatter;
    const {relativePath} = getNode(node.parent);
    let slug = permalink;

    const parsedFilePath = path.parse(relativePath);
    const {dir, name} = parsedFilePath;

    if (dir === ``) {
      slug = name;
    } else {
      slug = dir;
    }

    createNodeField({
      node,
      name: 'path',
      value: `/${slug}`,
    });

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const postComponent = path.resolve(`./src/templates/post.jsx`);
  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(filter: {frontmatter: {draft: {ne: true}}}, sort: {fields: [frontmatter___date], order: DESC}) {
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

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors);
    throw new Error(allMarkdown.errors);
  }

  const posts = allMarkdown.data.allMarkdownRemark.edges;

  const articles = posts.filter(edge => edge.node.frontmatter.type === `article`);
  const projects = posts.filter(edge => edge.node.frontmatter.type === `project`);

  articles.forEach(({node}, index) => {
    const {slug} = node.fields;

    createPage({
      path: slug, // required
      component: postComponent,
      context: {
        slug,
        prev: index === 0 ? null : articles[index - 1].node,
        next: index === articles.length - 1 ? null : articles[index + 1].node,
      },
    });
  });

  projects.forEach(({node}, index) => {
    const {slug} = node.fields;

    createPage({
      path: slug, // required
      component: postComponent,
      context: {
        slug,
        prev: index === 0 ? null : projects[index - 1].node,
        next: index === projects.length - 1 ? null : projects[index + 1].node,
      },
    });
  });
};
