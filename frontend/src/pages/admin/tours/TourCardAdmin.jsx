import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { BASE_URL } from "../../../utils/config";
import { Button } from "reactstrap";
const TourCardAdmin = ({ tour }) => {
  const navigate = useNavigate();
  const {
    _id,
    title,
    address,
    city,
    hotel,
    photo,
    price,
    maxGroupSize,
    featured,
    reviews,
  } = tour;
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/tours/${_id}`, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          role: "admin",
        },
        body: JSON.stringify({
          _id,
        }),
      });
      const result = await res.json();
      if (!res.ok) alert(result.message);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <tr>
      <td>{title}</td>
      <td>{address}</td>
      <td>{city}</td>
      <td>{hotel}</td>
      <td>{price}</td>
      <td>{maxGroupSize}</td>
      <td>
        {/* <Link className={"btn btn-info"} to={`#!`}>View</Link> */}
        <Link className={"btn btn-success mx-2"} to={`/admin/tours/${_id}`}>
          <i className="ri-edit-line"></i>
        </Link>
        <Button className="btn btn-danger" type="button" onClick={handleClick}>
          <i className="ri-delete-bin-5-line"></i>
        </Button>
      </td>
    </tr>
  );
};

export default TourCardAdmin;
