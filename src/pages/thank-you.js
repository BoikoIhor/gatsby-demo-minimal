import React from "react";
import IndexProvider from "context";
import { useWindow } from "context/windowContext";
import { navigate } from "gatsby";
import Main from "components/Layout/main";
import Button from "components/UI/button";
import "../styles/thank-you-page.scss";

const ThankYou = (props) => {
  const ThankYouWrapper = () => {
    const { window } = useWindow();
    const currLocationParams = new URLSearchParams(window.location.search);
    const idValue = currLocationParams.get("orderId");

    if(!idValue){
      navigate('/')
    }

    return (
      <Main>
        <div className="thank-you-content">
          <h1 className="thank-you-content__title">
            Thank you for placing order
          </h1>
          <h2 className="thank-you-content__description">
            Your order id: {idValue}
          </h2>
          <h2 className="thank-you-content__description">
            You can check your order status on orders section of your account
            page
          </h2>
          <Button value="Check my orders" href="/my-account" type="dark" />
          <Button value="Continue shopping" href="/" type="light" />
        </div>
      </Main>
    );
  };

  return (
    <IndexProvider>
      <ThankYouWrapper />
    </IndexProvider>
  );
};
export default ThankYou;
