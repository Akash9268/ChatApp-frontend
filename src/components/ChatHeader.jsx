import React from "react";

function ChatHeader({ user }) {
  return (
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
          <strong>Logged in as {user}</strong>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
