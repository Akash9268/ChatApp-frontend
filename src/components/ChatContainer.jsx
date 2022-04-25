import React from "react";

function ChatContainer(props) {
  return (
    <div className="card border-2 border-info w-100 vh-80">
      <div className="d-flex flex-column col-12 col-lg-12 col-xl-12">
        {props.children}
      </div>
    </div>
  );
}

export default ChatContainer;
