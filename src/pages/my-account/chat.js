import React from "react";
import IndexProvider from "context";
import "../../styles/chat.scss";
import ChatContent from "../../components/UI/chatContent";

const Chat = (props) => {
  return (
    <IndexProvider>
      <ChatContent />
    </IndexProvider>
  );
};
export default Chat;
