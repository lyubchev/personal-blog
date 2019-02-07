const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve(__dirname + '/src/templates/post.jsx');

    /**
     * We resolve the promise so we can get the result from
     * the graphql query
     */
    resolve(
      graphql(`
        query {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  path
                  title
                }
              }
            }
          }
        }
      `).then(result => {
        /**
         * Reject the promise on errors
         */
        if (result.errors) {
          return Promise.reject(result.errors);
        }

        /**
         * Set the newly gathered post to a variable
         */
        const posts = result.data.allMarkdownRemark.edges;

        /**
         * Create the actual pages by mapping through posts
         */
        posts.forEach(({ node }) => {
          const path = node.frontmatter.path;

          /**
           * Make pathSlug = path, later on we will use it to
           * to fetch the wanted post
           */
          createPage({
            path,
            component: postTemplate,
            context: {
              pathSlug: path
            }
          });
        });
      })
    );
  });
};
