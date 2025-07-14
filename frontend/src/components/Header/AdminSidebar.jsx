import React from "react";
import { NavLink } from "react-router-dom";
const nav__links = [
  {
    path: "/admin/dashboard",
    display: "Home",
  },
  {
    path: "/admin/bookings",
    display: "Booking",
  },
  {
    path: "/admin/media",
    display: "Media",
  },
  {
    path: "/admin/tours",
    display: "Tours",
  },
  {
    path: "/admin/dashboard",
    display: "Payment",
  },
  {
    path: "/admin/users",
    display: "Users",
  },
];

const AdminSidebar = () => {
  return (
    <div>
      <aside>
        <ul className="nav flex-column">
          {nav__links.map((item, index) => (
            <li className="nav__item" key={index}>
              <NavLink to={item.path} className="d-block py-2">
                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default AdminSidebar;
