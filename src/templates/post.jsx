import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts/layout';
import TagsBlock from '../components/TagsBlock';

const Post = ({ data }) => {
  const post = data.markdownRemark;
  const html = post.html;
  const { title, date, tags } = post.frontmatter;

  return (
    <Layout>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <TagsBlock tags={tags} />
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
        tags
      }
    }
  }
`;

export default Post;
