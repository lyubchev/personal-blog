const path = require('path');

/**
 * Implements the Gatsby API "createPages". This is called once the
 * data layer is bootstrapped to let plugins create pages from data.
 */
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

/**
 * Implements the Gatsby API "onCreatePage".
 * This is called after page is created
 */
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  return new Promise(resolve => {
    const oldPage = Object.assign({}, page);

    /**
     * Remove trailing slash unless page is "/"
     */
    page.path = replacePath(page.path);
    if (page.path !== oldPage.path) {
      /**
       * Replace new page with old page
       */
      deletePage(oldPage);
      createPage(page);
    }
    resolve();
  });
};

/**
 * Replacing '/' would result in empty string which is invalid
 */
const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``));
