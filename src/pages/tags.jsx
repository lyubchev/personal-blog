import React from 'react';

const TagsPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
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
