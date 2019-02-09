import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/layout';

const Post = ({ data }) => {
  const post = data.markdownRemark;
  const { title, date } = post.frontmatter;
  const html = post.html;

  return (
    <Layout>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export const query = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM Do, YYYY")
        title
      }
    }
  }
`;

export default Post;
