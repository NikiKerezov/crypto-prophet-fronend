import React from "react";

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import SignUp from "../index-sections/SignUp.js";

function LandingPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper" dark-background>
        <LandingPageHeader />
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">What is Crypto prophet?</h2>
                <h5 className="description">
                  Crypto Prophet is a telegram bot that provides you with the latest news and updates on the cryptocurrency market. That makes trading crypto easy for you! No more fake news and hours of reading multiple websites! Get all the information you need in one place!
                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                <div className="hero-images-container-1">
                    <img
                      alt="..."
                      src={require("assets/img/tg-logo.png")}
                    ></img>
                </div>
                <div className="hero-images-container-1">
                  <img
                    alt="..."
                    src={require("assets/img/crypto_prophet_logo.png")}
                  ></img>
                </div>
                </Col>
                <Col md="5">
                <div className="hero-images-container-1">
                  <img
                    alt="..."
                    src={require("assets/img/btc-logo.png")}
                  ></img>
                </div>
                  <h3>
                    So why should you invest in crypto?
                  </h3>
                  <p>
                    Cryptocurrencies are digital or virtual currencies that use cryptography for security and are typically decentralized. 
                    They are secured by cryptography, which makes it nearly impossible to counterfeit or double-spend. 
                    Many cryptocurrencies are built on blockchain technology, a distributed ledger enforced by a disparate network of computers. 
                    A defining feature of cryptocurrencies is that they are generally not issued by any central authority, rendering them theoretically immune to government interference or manipulation. 
                  </p>
                  <p>
                    Cryptocurrencies are systems that allow for secure payments online which are denominated in terms of virtual "tokens," which are represented by ledger entries internal to the system.
                  </p>
                  <p>
                    The first blockchain-based cryptocurrency was Bitcoin, which still remains the most popular and most valuable. 
                    Today, there are thousands of alternate cryptocurrencies with various functions and specifications. 
                    Some of these are clones of Bitcoin, while others are forks, or new cryptocurrencies that split off from an already existing one.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className = "section section-signup">
          <Container>
              <SignUp />
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default LandingPage;
