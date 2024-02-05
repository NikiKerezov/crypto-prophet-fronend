/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="/landing-page"
                target="_blank"
              >
                Crypto Prophet
              </a>
            </li>
            <li>
              <a
                href="/landing-page"
                target="_blank"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/landing-page"
                target="_blank"
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}

export default TransparentFooter;
