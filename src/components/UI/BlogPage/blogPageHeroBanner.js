import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import HeroBanner from "components/UI/heroBanner";

export const blogHeroBannerQuery = graphql`
query BlogHeroBannerQuery {
  allContentfulBannerUpdated {
    edges {
      node {
        id
        title
        plainText
        location
        type
        image {
          file {
            url
          }
        }
        imageMobile {
          file {
            url
          }
        }
        text {
          raw
        }
      }
    }
  }
}
`;

const BlogPageHeroBanner = () => {
  const bannersData = useStaticQuery(blogHeroBannerQuery);
  const banners = bannersData.allContentfulBannerUpdated.edges;
  const heroBanner = banners.filter(banner => banner.node.type === 'hero' && banner.node.location === 'blog-page');

  return (
    <HeroBanner {...heroBanner[0].node}/>
  );
};

export default BlogPageHeroBanner;
