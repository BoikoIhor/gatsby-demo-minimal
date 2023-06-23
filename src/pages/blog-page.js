import React from "react";
import IndexProvider from "context";

import Main from "components/Layout/main";
import BlogHeroBanner from "components/UI/BlogPage/blogPageHeroBanner";
import BlogPosts from "components/UI/BlogPage/blogPageContent";

import "styles/blog-page.scss";

const BlogPage = (props) => {
    const gtmData = {
        page: {
            title: "Blog",
            type: "Static",
        },
    };

    return (
        <IndexProvider>
            <Main className="blog" gtmData={gtmData}>
                <BlogHeroBanner/>
                <BlogPosts/>
            </Main>
        </IndexProvider>
    );
};

export default BlogPage;
