import React from "react";
import ScrollableFeed from "react-scrollable-feed";

function ChatBody({ user, messages }) {
  return (
    <div className="position-relative chat-height overflow-auto">
      <ScrollableFeed>
        <div className="p-4">
          {messages.map((message, index) => {
            return message.type === "UserStatus" ? (
              <div key={index} className="text-center"></div>
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
                  {message.message}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollableFeed>
    </div>
  );
}

export default ChatBody;
