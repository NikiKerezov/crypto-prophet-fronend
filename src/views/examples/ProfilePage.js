import React, { useState, useEffect } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import StripeCancellationContainer from "components/stripe/StripeCancellationContainer";
import BuyButtonComponent from "components/stripe/StripeButton";
import TelegramLinkCard from "components/TelegramLinkCard";
import Cookies from "js-cookie";

function ProfilePage() {
  const [pills, setPills] = useState("2");
  const [showItem, setShowItem] = useState(false);
  const isProfileEnabled = Cookies.get("isProfileEnabled");

  useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowItem(true); 
    }, 5000);

    return () => clearTimeout(timeoutId); // Cleanup
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <ProfilePageHeader />
        <div className="section">
        <div>
          {isProfileEnabled === "false" ? ( // Convert string to boolean for comparison
            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {showItem && <BuyButtonComponent />}
            </Container>
          ) : (
            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <StripeCancellationContainer />
            </Container>
          )}
          {console.log("isProfileEnabled: ", isProfileEnabled)}
        </div>
          <TelegramLinkCard />
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default ProfilePage;
