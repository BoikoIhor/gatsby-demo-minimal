import React from "react";
import "styles/banners.scss";
import Banner from "components/UI/banner";
import Button from "./button";

const Banners = (props) => {
    const { banners, bannersTitle, onClick, children, Button, ...restProps } = props;

    return (
        <div className="banners">
            {bannersTitle && (
                Button ? (
                    <div className="banners__title-wrapper">
                        <div>
                            <h2 className="banners-title typography__h2">
                                {bannersTitle}
                            </h2>
                        </div>
                        <Button/>
                    </div>
                ) : (
                    <h2 className="banners-title typography__h2">
                        {bannersTitle}
                    </h2>
                )
            )}
            <div className="banners-posts">
                {banners.map(({ node }) => (
                    <Banner
                        key={node?.id}
                        image={node?.image}
                        imageMobile={node?.imageMobile}
                        title={node?.title}
                        type={node?.type}
                        plainText={node?.plainText}
                        link={node?.link}
                        onClick={onClick}
                    />
                ))}
            </div>
            {bannersTitle && Button ? (
                <div className="mobile-banners-link">
                    <Button
                        href="/blog-page"
                        value="Alle blogartikelen"
                        isArrowShow
                        type="transparent"
                    />
                </div>
            ) : null}
            {children}
        </div>
    );
};

export default Banners;
