import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/layout';

const Post = ({ data }) => {
  const post = data.markdownRemark;
  const title = post.frontmatter.title;
  const date = post.frontmatter.date;
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
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        date(formatString: "MMMM Do, YYYY")
        title
      }
    }
  }
`;

export default Post;
