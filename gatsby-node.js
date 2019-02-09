const path = require('path');

/**
 * Implements the Gatsby API "createPages". This is called once the
 * data layer is bootstrapped to let plugins create pages from data.
 */
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve(__dirname + '/src/templates/post.jsx');
    const tagsPage = path.resolve(__dirname, 'src/pages/tags.jsx');
    const tagTemplate = path.resolve(__dirname + '/src/templates/tag.jsx');

    /**
     * We resolve the promise to get the response from
     * the graphql query as a param
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
                  tags
                }
              }
            }
          }
        }
      `).then(response => {
        /**
         * Reject the promise on errors
         */
        if (response.errors) {
          return Promise.reject(response.errors);
        }

        /**
         * Set the newly gathered post to a variable
         */
        const posts = response.data.allMarkdownRemark.edges;

        /**
         * Create an object where each tag corresponds to a list of posts
         */
        const postsByTag = {};

        /**
         * Create the actual pages by mapping through posts
         */
        posts.forEach(({ node }) => {
          const { path, tags } = node.frontmatter;

          /**
           * Populate the postsByTag object
           */
          tags.forEach(tag => {
            /**
             * If the current tag does not exist in our object, simple
             * create it, then each node is pushed
             */
            if (!postsByTag[tag]) {
              postsByTag[tag] = [];
            }

            postsByTag[tag].push(node);
          });

          /**
           * Make pathSlug = path, which will be used it to
           * to fetch the correct post
           */
          createPage({
            path,
            component: postTemplate
          });
        });

        /**
         * Get all tag names (keys), then send them as a context to /tags page
         */
        const tagKeys = Object.keys(postsByTag);

        createPage({
          path: '/tags',
          component: tagsPage,
          context: {
            tags: tagKeys.sort()
          }
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
