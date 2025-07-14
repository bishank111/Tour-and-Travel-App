import React, { useState, useContext } from "react";

import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "./../utils/config";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    cpassword: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const result = await res.json();
        if (!res.ok) alert(result.message);
        dispatch({ type: "REGISTER_SUCCESS" });
        navigate("/login");
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("confirm password do not match");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      id="username"
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      id="email"
                      onChange={handleChange}
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      id="password"
                      onChange={handleChange}
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      id="cpassword"
                      onChange={handleChange}
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Create account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
