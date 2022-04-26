import React, { useState, useEffect } from "react";
import Login from "./Login";
import Chat from "./Chat";

function Main({ socket }) {
  const [newUser, setNewUser] = useState("");
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleChange = (e) => {
    setNewUser(e.target.value);
  };

  const logNewUser = () => {
    console.log({ username: newUser });
    socket.auth = { username: newUser };
    socket.connect();
  };

  const sendMessage = () => {
    socket.emit("new message", message);
    const newMessage = {
      type: "message",
      userId: user.userId,
      username: user.username,
      message,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("users", (users) => {
      const messagesArray = [];
      for (const { userId, username } of users) {
        const newMessage = { type: "UserStatus", userId, username };
        messagesArray.push(newMessage);
      }

      setMessages([...messages, ...messagesArray]);
      setUsers(users);
    });

    socket.on("session", ({ userId, username }) =>
      setUser({ userId, username })
    );

    socket.on("user connected", ({ userId, username }) => {
      const newMessage = { type: "UserStatus", userId, username };
      setMessages([...messages, newMessage]);
    });

    console.log(messages);

    socket.on("new message", ({ userId, username, message }) => {
      const newMessage = {
        type: "message",
        userId: userId,
        username: username,
        message,
      };

      setMessages([...messages, newMessage]);
    });
  }, [socket, messages]);

  return (
    <main className="content">
      <div className="container mt-3">
        {user.userId && (
          <Chat
            user={user}
            setMessage={setMessage}
            sendMessage={sendMessage}
            message={message}
            messages={messages}
          ></Chat>
        )}

        {/* user not logged in */}
        {!user.userId && (
          <Login
            newUser={newUser}
            handleChange={handleChange}
            logNewUser={logNewUser}
          ></Login>
        )}
      </div>
    </main>
  );
}

export default Main;
