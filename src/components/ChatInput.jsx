import React from "react";

function ChatInput({ message, setMessage, sendMessage }) {
  return (
    <div className="mt-500 align-items-end border-info py-3 px-4 border-top d-lg-block chat-input">
      <div className="input-group flex-fill">
        <input
          type="text"
          className="form-control mr-10"
          name="message"
          value={message}
          placeholder="Type Your Message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.code === "Enter" ? sendMessage() : null)}
        />
        <button className="btn btn-success">Send</button>
      </div>
    </div>
  );
}

export default ChatInput;
