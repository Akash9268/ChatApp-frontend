import React from "react";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ScrollableFeed from "react-scrollable-feed";

function Chat({ user, setMessage, sendMessage, message, messages }) {
  return (
    <ChatContainer>
      <ChatHeader user={user.username}></ChatHeader>
      <div className="position-relative chat-height overflow-auto">
        <ScrollableFeed>
          <div className="p-4">
            {messages.map((message, index) => {
              return message.type === "UserStatus" ? (
                <div key={index} className="text-center">
                  <span className="badge bg-info">
                    {message.userId === user.userId
                      ? "You have Joined!"
                      : `${message.username} has joined`}
                  </span>
                </div>
              ) : (
                <div
                  key={index}
                  className={
                    message.userId === user.userId
                      ? "chat-message-right pb-4"
                      : "chat-message-left pb-4"
                  }
                >
                  <div>
                    <img
                      src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png"
                      className="rounded-circle mx-2"
                      alt={message.username}
                      title={message.username}
                      width="40"
                      height="40"
                    />
                  </div>

                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                    {/* <div className="font-weight-bold mb-1">
                      {message.userId === user.userId
                        ? "You"
                        : message.username}
                    </div> */}
                    {message.message}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollableFeed>
      </div>
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      ></ChatInput>
    </ChatContainer>
  );
}

export default Chat;
