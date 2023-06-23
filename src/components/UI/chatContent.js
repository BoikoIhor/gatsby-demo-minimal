import React from "react";

import { ReactSVG } from "react-svg";
import DownloadIcon from "../../images/svg/downloadIcon.svg";
import Main from "components/Layout/main";
import Button from "components/UI/button";
import useChat from "../../hooks/useChat";

const ChatContent = (props) => {
  const {
    formatDate,
    messages,
    admin,
    user,
    textAreaValue,
    changeMessageHandler,
    sendMessageHandler,
    localChatID,
    fileRef,
    lastMessageRef
  } = useChat();

  if (!localChatID) {
    return null;
  }
  
  return (
    <Main>
      <div className="chat-content">
        <div className="messages">
          {(messages?.comments || []).map((message,index) => {
            const isUser = user.id === message.author_id;

            return (
              <div
                key={message.id}
                className={` ${isUser ? "message outcome" : "message"}`}
                ref={index === messages.comments.length -1 ? lastMessageRef :null}
              >
                <p className="message__author">{isUser ? "Me" : admin.name}</p>
                <p
                  className="message__text"
                  dangerouslySetInnerHTML={{ __html: message.html_body }}
                />
                <div className="message__atachments">
                  {message.attachments.map((atachment) => {
                    return (
                      <a
                        key={atachment.id}
                        className={
                          isUser
                            ? "message__atachment--outcome"
                            : "message__atachment"
                        }
                        href={atachment.content_url}
                        target="_blank"
                      >
                        <ReactSVG src={DownloadIcon} />
                        {atachment.file_name}
                      </a>
                    );
                  })}
                </div>
                <p className="message__date">
                  {formatDate(message.created_at)}
                </p>
              </div>
            );
          })}
        </div>
        <hr></hr>
        <form onSubmit={sendMessageHandler} className="chat-form">
          <div className="chat-form__fields">
            <textarea
              placeholder="Type your message here"
              name="message"
              rows={4}
              wrap="soft"
              required
              className="chat-form__textarea"
              value={textAreaValue}
              onChange={changeMessageHandler}
            />
            <div className="input-container">
              <input
                className="file-input"
                name="file"
                type="file"
                multiple
                ref={fileRef}
              />
            </div>
          </div>

          <div className="chat-form__buttons">
            <Button value="Send" isSubmit type="dark" />
            <Button value="Close" href="/my-account" type="light" />
          </div>
        </form>
      </div>
    </Main>
  );
};
export default ChatContent;
