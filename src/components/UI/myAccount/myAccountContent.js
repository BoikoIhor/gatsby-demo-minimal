import React from "react";
import { useCustomer } from "context/customerContext";
import { useStaticQuery, graphql } from "gatsby";
import useValidation from "hooks/useValidation";
import { useScrollLock } from "hooks/useScrollLock";
import { navigate } from "gatsby";
import { ReactSVG } from "react-svg";

import Input from "components/UI/input";
import Button from "components/UI/button";
import MyAccountAddress from "./myAccountAddress";
import MyAccountOrderItem from "./myAccountOrderItem";
import MyAccountOrder from "./myAccountOrder";
import useMyAccount from "../../../hooks/myAccount/useMyAccount";
import "styles/my-account.scss";

import DoctorAvatar from "../../../images/doctor-avatar-sample.png";
import ArrowMobile from "../../../images/svg/my-account-arrow-mobile.svg";
import ArrowDesktop from "../../../images/svg/my-account-arrow-desktop.svg";
import ChatIcon from "../../../images/svg/chat-icon.svg";
import ExclemationIcon from "../../../images/svg/exclamation-light.svg";
import EditIcon from "../../../images/svg/EditIcon.svg";

export const myAccountImageQuery = graphql`
  query MyAccountImageQuery {
    allContentfulBannerUpdated(
      filter: { location: { eq: "My acoount" }, type: { eq: "image" } }
    ) {
      nodes {
        image {
          title
          file {
            url
          }
        }
      }
    }
  }
`;

const MyAccountContent = () => {
  const queryData = useStaticQuery(myAccountImageQuery);

  const myAccountImage = queryData.allContentfulBannerUpdated.nodes[0].image;

  const { removeCustomer } = useCustomer();
  const {
    hidePopup,
    isShowUpdateForm,
    setIsShowUpdateForm,
    editCustomerHandler,
    customerDetails,
    setCustomerDetails,
    orders,
    links,
    products,
    activeOrderPageID,
    setActiveOrderPageID,
    ordersCountToShow,
    showMore,
    showLess,
    entries,
    addresses,
    countries,
    getAddresses,
    getOrders,
    getCountries,
    unreadMessages,
    unreadMessagesCount,
  } = useMyAccount();

  const { validation } = useValidation();

  const currentOrder = orders.find((order) => order.id === activeOrderPageID);
  const sortedOrders = [...orders].sort((a, b) => {
    return Date.parse(b.date_modified) - Date.parse(a.date_modified);
  });

  const ordersToShow = sortedOrders.slice(0, ordersCountToShow);

  useScrollLock(isShowUpdateForm);

  if (activeOrderPageID) {
    return (
      <MyAccountOrder
        setActiveOrderPageID={setActiveOrderPageID}
        activeOrderPageID={activeOrderPageID}
        orderData={currentOrder}
        products={products}
      />
    );
  }

  const chatNameMap = {
    "checking-type-hair-treatment": "Hair",
    "checking-type-pe": "Premajure Ejaculation",
    "checking-type-ed": "Erectile Disfunction",
    "checking-id": "ID verification",
  };

  return (
    <>
      <main className="my-account__content">
        <div className="order-block">
          <h2 className="title">Overzicht</h2>
          {unreadMessagesCount > 0 && (
            <div className="messages">
              <div className="messages__title">
                <p className="messages__title--title">Nieuwe berichten </p>
                <span className="messages__title--count">
                  {unreadMessagesCount}
                </span>
              </div>
              {Object.entries(unreadMessages).map((item) => {
                return (
                  <div
                    key={item[0]}
                    onClick={() =>
                      navigate(`/my-account/chat?chatId=${item[0]}`)
                    }
                    className="messages__message"
                  >
                    <img src={DoctorAvatar} alt="Doctor" />
                    <div className="messages__message--wrapper">
                      <p className="messages__message--problem">
                        {chatNameMap[item[0]]}
                      </p>
                      <p className="messages__message--doctor">Dr. Stultz</p>
                    </div>
                    <span className="messages__title--count">{item[1]}</span>
                    <ReactSVG className="mobile-icon" src={ArrowMobile} />
                    <ReactSVG className="desktop-icon" src={ArrowDesktop} />
                  </div>
                );
              })}
            </div>
          )}

          <div className="therapy">
            <div className="therapy__title">
              <p className="subtitle">Behandelingen </p>
              <span className="therapy__title--message">
                <ReactSVG
                  className="therapy__title--message--exclamation"
                  src={ExclemationIcon}
                />
                Actie vereist
              </span>
            </div>
            {entries.map((chat) => {
              const admin = (chat[1]?.users || []).find(
                (user) => user.role === "admin"
              );
              return (
                <div
                  key={chat[0]}
                  className="therapy__block"
                  onClick={() => navigate(`/my-account/chat?chatId=${chat[0]}`)}
                >
                  <p className="messages__message--problem">
                    {chatNameMap[chat[0]]}
                  </p>
                  <p className="messages__message--doctor">{admin.name}</p>
                  <ReactSVG className="mobile-icon" src={ArrowMobile} />
                  <ReactSVG className="desktop-icon" src={ArrowDesktop} />
                </div>
              );
            })}

            {!entries.length && (
              <div className="orders__order typography__p">
                There is no active chats yet...
              </div>
            )}
          </div>
          <div className="orders">
            <p className="subtitle">Bestellingen </p>
            {ordersToShow.map((order) => {
              return (
                <MyAccountOrderItem
                  key={order.id}
                  setActiveOrderPageID={setActiveOrderPageID}
                  id={order.id}
                  products={products}
                  dateCreated={order.date_created}
                />
              );
            })}
            {orders.length > 3 && ordersCountToShow > 3 && (
              <button className="show-more" onClick={showLess}>
                Show less
              </button>
            )}
            {orders.length > 3 && orders.length > ordersCountToShow && (
              <button className="show-more" onClick={showMore}>
                Show more
              </button>
            )}
            {!orders.length && (
              <div className="orders__order typography__p">
                There is no orders yet...
              </div>
            )}
          </div>
          <div className="account">
            <div className="account__title">
              <p className="subtitle">Account </p>
              <button
                onClick={() => setIsShowUpdateForm(true)}
                className="account__edit"
              >
                <ReactSVG src={EditIcon} />
                Edit
              </button>
            </div>
            <div className="account__info">
              <div className="account__info__item">
                <p className="account__info__item--heading">Name</p>
                <p className="account__info__item--value">
                  {customerDetails?.first_name} {customerDetails?.last_name}
                </p>
              </div>
              <div className="account__info__item">
                <p className="account__info__item--heading">Email</p>
                <p className="account__info__item--value">
                  {customerDetails?.email}
                </p>
              </div>
              <div className="account__info__item">
                <p className="account__info__item--heading">Company</p>
                <p className="account__info__item--value">
                  {customerDetails?.company}
                </p>
              </div>
            </div>
            <MyAccountAddress
              addresses={addresses}
              countries={countries}
              getAddresses={getAddresses}
              getOrders={getOrders}
              getCountries={getCountries}
            />
          </div>
          <button onClick={removeCustomer} className="logout">
            Log Out
          </button>
        </div>
        <div className="nav-block">
          <h2 className="nav-title">Ondersteuning</h2>
          <div className="support">
            <img
              className="support__image"
              alt={myAccountImage.title}
              src={myAccountImage.file.url}
            />
            <p className="support__title">Praat met een arts</p>
            <p className="support__description">
              Stel vragen over je behandeling direct aan onze artsen.
            </p>
            <button className="support__button">
              Start een gesprek
              <ReactSVG className="chat-icon" src={ChatIcon} />
            </button>
          </div>
          <div className="service">
            <h2 className="support__title">Klantenservice</h2>
            <p className="service__description">
              Voor niet medische vragen over je behandeling kun je bij onze
              klanten service terecht.
            </p>
          </div>

          <div className="links">
            {links.map((item) => {
              if (item.href) {
                return (
                  <a href={item.href} key={item.id} className="links__item">
                    <p>{item.title}</p>
                    <ReactSVG className="mobile-icon" src={ArrowMobile} />
                    <ReactSVG className="desktop-icon" src={ArrowDesktop} />
                  </a>
                );
              } else {
                return (
                  <button
                    onClick={item.onClick}
                    key={item.id}
                    className="links__item"
                  >
                    <div>
                      <p>{item.title}</p>
                      <ReactSVG className="mobile-icon" src={ArrowMobile} />
                      <ReactSVG className="desktop-icon" src={ArrowDesktop} />
                    </div>
                  </button>
                );
              }
            })}
          </div>
        </div>
      </main>

      {isShowUpdateForm && (
        <div onClick={hidePopup} className="popup-wrapper">
          <div className="popup-wrapper__content">
            <form
              onSubmit={editCustomerHandler}
              className="popup-wrapper__content__form"
            >
              <Input
                type="text"
                placeholder="First name"
                name="first_name"
                value={customerDetails.first_name}
                onChange={setCustomerDetails}
              />
              <Input
                type="text"
                placeholder="Last name"
                name="last_name"
                value={customerDetails.last_name}
                onChange={setCustomerDetails}
              />
              <Input
                type="text"
                placeholder="Email"
                name="email"
                value={customerDetails.email}
                onChange={setCustomerDetails}
              />
              <Input
                type="number"
                placeholder="Phone number"
                name="phone"
                value={customerDetails.phone}
                onChange={setCustomerDetails}
                validation={[validation.phone, validation.allowEmpty]}
              />
              <Input
                type="text"
                placeholder="Company"
                name="company"
                value={customerDetails.company}
                onChange={setCustomerDetails}
                validation={[validation.allowEmpty]}
              />
              <Button value="Update Details" type="dark" isArrowShow isSubmit />
              <Button value="Cancel" type="light" onClick={hidePopup} />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyAccountContent;
