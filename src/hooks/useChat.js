import React, { useEffect, useState, useCallback, useRef } from "react";
import { useWindow } from "context/windowContext";
import { useCustomer } from "context/customerContext";
import axios from "axios";
import FormData from "form-data";

const useChat = (props) => {
  const { window, localStorage } = useWindow();
  const { customerData } = useCustomer();
  const [localChatID, setLocalChatID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const fileRef = useRef(null);
  const lastMessageRef = useRef(null);

  const admin = (messages?.users || []).find((user) => user.role === "admin");
  const user = (messages?.users || []).find((user) => user.role === "end-user");

  const getChat = useCallback(async () => {
    const response = await axios.get("/api/zendesk/chat/getmessages", {
      params: {
        customer_id: customerData.id,
        type: localChatID,
      },
    });
    if (response?.data[localChatID]) {
      setMessages(response?.data[localChatID]);
    }

    const messageCounter =
      JSON.parse(localStorage.getItem("chatMessagesCount")) || {};
    localStorage.setItem(
      "chatMessagesCount",
      JSON.stringify({
        ...messageCounter,
        [localChatID]: response.data[localChatID]?.count,
      })
    );
  }, [localChatID, customerData.id]);

  const changeMessageHandler = (e) => {
    setTextAreaValue(e.target.value);
  };

  const sendMessageHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("customer_id", customerData.id);
      formData.append("type", localChatID);
      formData.append("message", textAreaValue);
      const files = event?.target?.file?.files || [];

      Array.from(files).forEach((file) => {
        formData.append("file", file);
      });

      await axios.post("/api/zendesk/chat/sendmessage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      getChat();
      setTextAreaValue("");
      fileRef.current.value = null;
    } catch (error) {
      console.error(error);
    }
  };

  function formatDate(dateString) {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  }
  useEffect(() => {
    getChat();
  }, [localChatID, getChat]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [lastMessageRef.current]);

  useEffect(() => {
    const delay = lastMessageRef.current ? 5000 : 1000;
    const interval = setInterval(() => {
      getChat();
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, [getChat, lastMessageRef.current]);

  useEffect(() => {
    const search = window.location.search;
    const searchParams = new URLSearchParams(search);
    const chatId = searchParams.get("chatId");
    if (chatId !== localChatID) {
      setLocalChatID(chatId);
    }
  }, [window.location.search, localChatID]);

  return {
    formatDate,
    messages,
    admin,
    user,
    textAreaValue,
    changeMessageHandler,
    sendMessageHandler,
    localChatID,
    fileRef,
    lastMessageRef,
  };
};
export default useChat;
