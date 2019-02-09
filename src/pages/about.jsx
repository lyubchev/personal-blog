import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../layouts/layout';
import SEO from '../components/seo';

const AboutPage = ({ data }) => (
  <Layout>
    <SEO title="About" />
    <h1>About Page</h1>
    <p>This is the about page.</p>
    <Link to="/">Go back to the home page</Link>
  </Layout>
);

export const query = graphql`
  query AboutPageSiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
export default AboutPage;
