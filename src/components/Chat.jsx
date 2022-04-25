import React from "react";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

function Chat({ user, setMessage, message }) {
  return (
    <ChatContainer>
      <ChatHeader user={user}></ChatHeader>
      <ChatInput message={message} setMessage={setMessage}></ChatInput>
    </ChatContainer>
  );
}

export default Chat;
