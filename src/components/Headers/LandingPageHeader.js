import React from "react";
import { Container } from "reactstrap";

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        if (pageHeader.current) {
          let windowScrollTop = window.pageYOffset / 3;
          pageHeader.current.style.transform =
            "translate3d(0," + windowScrollTop + "px,0)";
        }
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  }, []);

  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/chart-background.webp") + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">Crypto prophet</h1>
            <h2 className="description">Your best crypto advisor</h2>
            <div className="text-center">
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LandingPageHeader;
