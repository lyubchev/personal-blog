module.exports = {
  siteMetadata: {
    title: `Lyubo Lyubchev | Blog`,
    description: `Personal Blog`,
    author: `Lyubo Lyubchev`
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-transformer-remark',
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`
      }
    }
  ]
};
