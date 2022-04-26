import React from "react";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ScrollableFeed from "react-scrollable-feed";

function Chat({ user, setMessage, sendMessage, message, messages }) {
  return (
    <ChatContainer>
      <div className="d-flex flex-column col-4 col-lg-4 col-xl-4 pe-0 border-right-info">
        <div className="align-items-start py-2 px-4 w-100 border-bottom border-info d-lg-block sticky bg-white">
          <div className="d-flex align-items-center py-1">
            <div className="position-relative">
              <img
              src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png"
              className="rounded-circle mx-2"
              alt={user}
              width="40"
              height="40"
              />
            </div>

            <div>
              <strong>{user.username}</strong>
            </div>
          </div>
        </div>
      
    <div className="text-center bg-primary text-white">
      Connected User
    </div>

    <div className="d-flex justify-content-center align-items-center chat-window">
      No Users connected
    </div>
    </div>
    <div className="d-flex flex-column col-8 col-lg-8 col-xl-8 ps-0 chat-window">
      
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
    </div>
    </ChatContainer>
  );
}

export default Chat;
