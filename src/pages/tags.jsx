import React, { useState, useEffect } from 'react';
import Layout from '../layouts/layout';
import TagsBlock from '../components/TagsBlock';

const TagsPage = ({ data }) => {
  const [tags, setTags] = useState([]);
  const posts = data.allMarkdownRemark.edges;
  const tempTags = [];

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

  useEffect(() => {
    setTags(tempTags);
  }, []);

  return (
    <Layout>
      <div>Find posts by topic</div>
      <TagsBlock tags={tags} />
    </Layout>
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
