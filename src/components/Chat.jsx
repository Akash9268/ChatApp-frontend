import React, { useCallback } from "react";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ScrollableFeed from "react-scrollable-feed";
import { useState, useEffect, useRef } from "react";

import { Encrypt, Decrypt } from "../utils/aes.js";

function Chat({ socket, user, users, setUsers, messages, setMessages }) {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const currSelectedUser = useRef("");

  const findUser = useCallback(
    (userId) => {
      const userIndex = users.findIndex((user) => user.userId === userId);
      return userIndex >= 0;
    },
    [users]
  );

  const handleConnectionStatus = useCallback(
    (userId, status) => {
      const userIndex = users.findIndex((u) => u.userId === userId);
      if (userIndex >= 0) {
        console.log(users[userIndex]);
        users[userIndex].connected = status;
        setUsers([...users]);
      }
    },
    [users, setUsers]
  );

  const userConnected = useCallback(
    ({ userId, username }) => {
      console.log({ CONNECT_USERID: userId });

      if (user.userId !== userId) {
        const userExists = findUser(userId);
        if (userExists) {
          handleConnectionStatus(userId, true);
        } else {
          const newUser = { userId, username, connected: true };
          setUsers([...users, newUser]);
        }
      }
    },
    [user, users, setUsers, findUser, handleConnectionStatus]
  );

  const userDisconnected = useCallback(
    ({ userId }) => {
      console.log({ DISCONNECT_USERID: userId });

      handleConnectionStatus(userId, false);
    },
    [handleConnectionStatus]
  );

  const handleNewMessageStatus = useCallback(
    (userId, status) => {
      const userIndex = users.findIndex((u) => u.userId === userId);
      if (userIndex >= 0) {
        users[userIndex].hasNewMessage = status;
        setUsers([...users]);
      }
    },
    [users, setUsers]
  );

  const privateMessage = useCallback(
    ({ content, from, to }) => {
      //is user is selected don't alert me
      if (currSelectedUser.current) {
        if (currSelectedUser.current === from) {
          const newMessage = {
            type: "message",
            userId: from,
            message: Decrypt(content),
          };
          setMessages([...messages, newMessage]);
        } else {
          handleNewMessageStatus(from, true);
        }
      } //if user is not selected
      else {
        handleNewMessageStatus(from, true);
      }
    },
    [messages, setMessages, setMessages, handleNewMessageStatus]
  );

  const userMessages = useCallback(
    ({ messages }) => {
      const chatMessages = [];
      console.log({ messages_received: messages });
      if (messages.length >= 1) {
        messages.map((value, key) => {
          chatMessages.push({
            userId: value.from,
            message: Decrypt(value.content),
          });

          setMessages([...chatMessages]);
        });
      }
    },
    [setMessages]
  );

  useEffect(() => {
    socket.on("user connected", (user) => userConnected(user));

    socket.on("user disconnected", (user) => userDisconnected(user));

    socket.on("private message", (message) => privateMessage(message));

    socket.on("user message", (messages) => userMessages(messages));
  }, [socket, userConnected, userDisconnected, privateMessage, userMessages]);

  const sendMessage = () => {
    const encrypted_message = Encrypt(message);
    socket.emit("private message", {
      content: encrypted_message,
      to: selectedUser.userId,
    });

    const newMessage = {
      userId: user.userId,
      username: user.username,
      message,
    };

    console.log({ encrypted_message: encrypted_message });
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setMessages([]);

    socket.emit("user messages", user);

    currSelectedUser.current = user;

    handleNewMessageStatus(user.userId, false);
  };

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

        <div className="text-center bg-primary text-white">Connected User</div>
        {users.length > 0 ? (
          users.map((curruser, index) => {
            return (
              <div
                key={index}
                className="py-2 px-2 border-bottom border-info d-lg-block cursor-pointer"
                onClick={() => selectUser(curruser)}
              >
                <div className="d-flex align-items-center py-1">
                  <div className="d-flex flex-column position-relative">
                    <img
                      src={`https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png`}
                      className="rounded-circle mx-2"
                      alt={curruser}
                      width="45"
                      height="45"
                    />
                    <span
                      className={curruser.connected ? "online" : "offline"}
                    ></span>
                  </div>

                  <div className="d-flex flex-row position-relative">
                    <strong className="margin-right-100">
                      {curruser.username}
                    </strong>
                    <span
                      className={
                        curruser.hasNewMessage ? "new-message-alert mt-2" : ""
                      }
                    ></span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center chat-window">
            No Users connected
          </div>
        )}
      </div>
      {selectedUser.userId && (
        <div className="d-flex flex-column col-8 col-lg-8 col-xl-8 ps-0 chat-window">
          <ChatHeader user={selectedUser.username}></ChatHeader>
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
                        message.userId === selectedUser.userId
                          ? "chat-message-left pb-4"
                          : "chat-message-right pb-4"
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
          <ChatInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          ></ChatInput>
        </div>
      )}
    </ChatContainer>
  );
}

export default Chat;
