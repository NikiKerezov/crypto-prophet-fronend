/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a>
                  Crypto Prophet
                </a>
              </li>
              <li>
                <a
                >
                  About Us
                </a>
              </li>
              <li>
                <a>
                  Blog
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed by{" "}
            <a>
              Nikola Kerezov
            </a>
            . Coded by{" "}
            <a>
              Nikola Kerezov
            </a>
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
