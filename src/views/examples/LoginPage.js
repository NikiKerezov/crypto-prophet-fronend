import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const requestLogin = async (event, navigate, setLoginError) => {
  event.preventDefault();

  // Extract login data
  const username = event.target[0].value;
  const password = event.target[1].value;

  // Prepare JSON data
  const loginData = {
    username: username,
    password: password
  };

  try {
    const response = await fetch("http://localhost:8080/userHandler/v2/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    if (response.ok) {
      // Successful login
      const { jwtToken } = await response.json();
      Cookies.set('token', jwtToken, { secure: false });
      Cookies.set('username', username, { secure: false });

      // Redirect to /profile-page with user's name as parameter
      navigate(`/profile-page?name=${username}`);
    } else {
      // Handle authentication failure
      console.error("Authentication failed");
      setLoginError("Invalid Login");
    }
  } catch (error) {
    // Handle network or other errors
    console.error("Error during authentication:", error);
    setLoginError("Invalid Login");
  }
};

function LoginPage() {
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/crypto_prophet_bg.png") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form onSubmit={(event) => requestLogin(event, navigate, setLoginError)} className="form" method="">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("assets/img/now-logo.png")}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Username..."
                        type="text"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password..."
                        type="password"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                    {loginError && (
                      <div className="text-danger mt-3">{loginError}</div>
                    )}
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      size="lg"
                      type="submit"
                    >
                      Login
                    </Button>
                    <div className="pull-center">
                      <h6>
                        <Link
                          className="link"
                          to="/landing-page"
                        >
                          Create Account
                        </Link>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
      <TransparentFooter />
    </>
  );
}

export default LoginPage;
