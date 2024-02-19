import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Alert
} from "reactstrap";

function SignUp() {
  const navigate = useNavigate();
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const requestSignUp = async (event) => {
    event.preventDefault();

    const firstName = event.target[0].value;
    const lastName = event.target[1].value;
    const userName = event.target[2].value;
    const email = event.target[3].value;
    const password = event.target[4].value;

    const requestData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: userName,
      password: password
    };

    try {
      const response = await fetch("http://localhost:8080/userHandler/v2/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });
    
      if (response.ok) {
        console.log("Registration successful");
        setTimeout(async () => { // Make the arrow function async
          setSignUpSuccess(true);
          const { jwtToken } = await response.json(); // Use await inside an async function
          Cookies.set('token', jwtToken, { secure: false });
          console.log(jwtToken);
          navigate(`/profile-page?name=${userName}`);
        }, 2000);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }    
  };

  return (
    <div className="section section-signup" style={{backgroundImage: `url(${require("assets/img/sign_up_bg.png")})`, backgroundSize: "cover", backgroundPosition: "top center", minHeight: "700px"}}>
      <Container>
        <Row>
          <Card className="card-signup" data-background-color="blue">
            <Form className="form" onSubmit={requestSignUp}>
              <CardHeader className="text-center">
                <CardTitle className="title-up" tag="h3">Sign Up</CardTitle>
              </CardHeader>
              <CardBody>
                {signUpSuccess ? (
                  <Alert color="success">Successfully signed up! You can now login.</Alert>
                ) : (
                  <>
                    <InputGroup className={"no-border" + (firstFocus ? " input-group-focus" : "")}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="First Name..." type="text" onFocus={() => setFirstFocus(true)} onBlur={() => setFirstFocus(false)} />
                    </InputGroup>
                    <InputGroup className={"no-border" + (lastFocus ? " input-group-focus" : "")}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Last Name..." type="text" onFocus={() => setLastFocus(true)} onBlur={() => setLastFocus(false)} />
                    </InputGroup>
                    <InputGroup className={"no-border" + (userNameFocus ? " input-group-focus" : "")}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="User Name..." type="text" onFocus={() => setUserNameFocus(true)} onBlur={() => setUserNameFocus(false)} />
                    </InputGroup>
                    <InputGroup className={"no-border" + (emailFocus ? " input-group-focus" : "")}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email..." type="text" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} />
                    </InputGroup>
                    <InputGroup className={"no-border" + (passwordFocus ? " input-group-focus" : "")}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons objects_key-25"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password..." type="password" onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} />
                    </InputGroup>
                    <div className="text-center">
                      <Button className="btn-default btn-round" color="secondary" size="lg" type="submit">Get Started</Button>
                    </div>
                  </>
                )}
              </CardBody>
            </Form>
          </Card>
        </Row>
        <div className="col text-center">
          <Button className="btn-round btn-white" color="default" to="/login-page" outline size="lg" tag={Link}>Already have an account? Login</Button>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
