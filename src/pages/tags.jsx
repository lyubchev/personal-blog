import React from 'react';
import { Link } from 'gatsby';

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

  return (
    <div>
      <div>Find posts by topic</div>
      <ul>
        {tags.map((tagName, index) => (
          <li key={index}>
            <Link to={`/tags/${tagName}`}>{tagName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
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
