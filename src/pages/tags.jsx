import React from 'react';

const TagsPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  let tags = [];

  /**
   * Populate tags array
   */
  posts.forEach(({ node: { frontmatter: { tags: postTags } } }) => {
    postTags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  console.log(tags);
  return <div>Tags Page Not Here</div>;
};

export const query = graphql`
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
`;

export default TagsPage;
