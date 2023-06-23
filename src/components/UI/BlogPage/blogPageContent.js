import React, { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { useStaticQuery, graphql } from "gatsby";
import axios from "axios";

import Loader from "components/UI/loader";

const Banners = lazy(() => import('components/UI/banners'));


export const blogContentQuery = graphql`
query BlogContentQuery {
  allContentfulBannerUpdated {
    edges {
      node {
        title
        location
        type
        link {
          text
          type
          isArrowShow
          href
        }
      }
    }
  }
}
`;

const BlogPosts = () => {
    const blogStructure = [
        "30%", "70%",
        "30%", "30%", "30%",
        "100%",
        "30%", "30%", "30%",
    ];

    const blogContent = useStaticQuery(blogContentQuery);

    const banners = blogContent.allContentfulBannerUpdated.edges;
    const contentBanner = banners.filter(banner => banner.node.type === 'content' && banner.node.location === 'blog-page');
    const { title, link } = contentBanner[0].node;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/v2/blog/posts")
             .then(response => setPosts(response.data))
    }, [])

    const publishedPosts = useMemo(() =>
        posts
            .sort((a, b) => {
                const dateA = new Date(a.published_date_iso8601);
                const dateB = new Date(b.published_date_iso8601);
                return dateA - dateB;
            })
            .map((post, mapIndex) => {
                const { id, title, summary, thumbnail_path, url } = post;
                return {
                    node: {
                        id,
                        title,
                        plainText: summary,
                        image: {
                            file: {
                                url: process.env.GATSBY_BIGCOMMERCE_STOREFRONT_URL + thumbnail_path,
                            },
                            title,
                        },
                        link: {
                            text: link?.text ?? 'Read More',
                            type: link?.type ?? 'primary',
                            isArrowShow: link?.isArrowShow ?? true,
                            href: link?.href ?? url,
                        },
                        type: blogStructure[mapIndex % blogStructure.length],
                    },
                };
            }), [posts]);

    return (
        <div className="blog__content">
            <Suspense fallback={<Loader/>}>
                {
                    publishedPosts.length > 0 &&
                    <Banners bannersTitle={title} banners={publishedPosts}/>
                }
            </Suspense>
        </div>
    );
};

export default BlogPosts;
