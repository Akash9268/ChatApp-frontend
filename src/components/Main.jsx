import React, { useState, useEffect } from "react";
import Login from "./Login";
import Chat from "./Chat";

function Main({ socket }) {
  const [newUser, setNewUser] = useState("");
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setNewUser(e.target.value);
  };

  const logNewUser = () => {
    console.log({ username: newUser });
    socket.auth = { username: newUser };
    socket.connect();
  };

  useEffect(() => {
    socket.on("session", ({ userId, username }) => setUser(username));
  }, [socket]);

  return (
    <main className="content">
      <div className="container mt-3">
        {user && (
          <Chat user={user} setMessage={setMessage} message={message}></Chat>
        )}

        {/* user not logged in */}
        {!user && (
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
