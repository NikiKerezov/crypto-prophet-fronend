import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "reactstrap";

function ProfilePageHeader() {
  const pageHeader = React.createRef();
  const location = useLocation();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  // Access user's name from URL parameters
  const userName = new URLSearchParams(location.search).get("name");

  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/profile_bg.jpeg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          {/* Profile Picture */}
          <div className="profile-picture">
            <img
              alt="Profile"
              src={require("assets/img/neo.jpeg")}
              style={{
                width: "100px", // Adjust the width as needed
                height: "100px", // Adjust the height as needed
                borderRadius: "50%", // Make it circular
                objectFit: "cover", // Maintain aspect ratio and cover the container
              }}
            />
          </div>

          {/* User Information */}
          <div className="user-info">
            <h3 className="title">{userName}</h3>
            <p className="category">Photographer</p>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
