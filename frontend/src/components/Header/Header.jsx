import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import "./header.css";

import { AuthContext } from "./../../context/AuthContext";
import PropTypes from "prop-types";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = ({ direction, ...args }) => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    // window.addEventListener("scroll", () => {
    //     if (
    //         document.body.scrollTop > 80 ||
    //         document.documentElement.scrollTop > 80
    //     ) {
    //         headerRef.current.classList.add("sticky__header");
    //     } else {
    //         headerRef.current.classList.remove("sticky__header");
    //     }
    // });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* =========== logo ============ */}
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            {/* =========== logo  end============ */}

            {/* ===========menu start============ */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* ===========menu end============ */}
            <div className="nav__right d-flex align-items-center gap-4 ">
              <div className="d-flex align-items-center gap-4 ">
                {user ? (
                  <>
                    {user.role === "admin" ? (
                      <>
                        <a className="nav-link" href="/admin/dashboard">
                          Dashboard
                        </a>
                      </>
                    ) : (
                      <>
                        <a className="nav-link fw-bold" href="/my-booking">
                          My Booking
                        </a>
                      </>
                    )}

                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};
Header.propTypes = {
  direction: PropTypes.string,
};
export default Header;
