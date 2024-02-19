import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import axios from "axios";

function ProfilePageHeader() {
  const pageHeader = React.createRef();
  const location = useLocation();
  const jwtToken = Cookies.get("token");
  const [isProfileEnabled, setIsProfileEnabled] = useState(false);
  const userName = new URLSearchParams(location.search).get("name");
  Cookies.set("username", userName);

  console.log(userName);

  useEffect(() => {
    const fetchIsProfileEnabled = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/userHandler/v2/user/isProfileEnabled',
           userName,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (response.status === 200) {
          setIsProfileEnabled(response.data); // Assuming response.data directly holds the boolean value
          Cookies.set("isProfileEnabled", response.data);
          console.log("isProfileEnabled: ", response.data);
        } else {
          throw new Error(`API error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching profile status:", error);
      }
    };

    fetchIsProfileEnabled();
  }, [userName, jwtToken, isProfileEnabled]);


  console.log(isProfileEnabled);


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
            <p className="category">{isProfileEnabled ? "Profile is enabled" : "Profile is disabled"}</p>

          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
