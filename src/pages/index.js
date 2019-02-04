import React from 'react';
import { Link, graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../layouts/layout';

const HomePage = ({ data }) => {
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi, this is the home page</h1>
      {edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.frontmatter.path}>
            <h3>{node.frontmatter.title} </h3>
          </Link>
          <p>{node.frontmatter.date}</p>
          <p>{node.excerpt}</p>
        </div>
      ))}
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }} />
      <Link to="/about">Go to About page</Link>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { draft: { eq: false } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            path
            title
            date(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  }
`;

export default HomePage;
