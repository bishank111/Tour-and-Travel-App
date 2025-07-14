import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";
import { AuthContext } from "../../../context/AuthContext";
import { BASE_URL } from "../../../utils/config";
import AdminHeader from "../../../components/Header/AdminHeader";
import AdminSidebar from "../../../components/Header/AdminSidebar";
import useFetch from "../../../hooks/useFetch";
const UsersAdmin = () => {
  const { data: users } = useFetch(`${BASE_URL}/users`);
  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          role: "admin",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const result = await res.json();
      if (!res.ok) alert(result.message);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
    role: "admin",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();
      if (res.ok) alert(result.message);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <AdminHeader />
      <div className="container-fluid max-h-100">
        <Row className="h-100">
          <div className="col-md-2 sidebar">
            <AdminSidebar></AdminSidebar>
          </div>
          <div className="col-md-10">
            <div className="d-flex justify-content-between py-3">
              <h4>Manage Users</h4>
            </div>
            <Form onSubmit={handleClick}>
              <Row>
                <Col cols="12" lg="3">
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col cols="12" lg="3">
                  <FormGroup>
                    <Input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col cols="12" lg="3">
                  <FormGroup>
                    <Input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col cols="12" lg="3">
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Create Admin User
                  </Button>
                </Col>
              </Row>
            </Form>

            <Row>
              <Col>
                <table className={"table table-stripe"}>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Created Date</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user, key) => (
                      <tr key={key}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.createdAt}</td>
                        <td>{user.role}</td>
                        <td>
                          {
                            <Button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => deleteUser(user._id)}
                            >
                              Delete
                            </Button>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    </>
  );
};
export default UsersAdmin;
