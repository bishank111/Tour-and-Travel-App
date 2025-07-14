import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";

import "../../../styles/media.css";
import { BASE_URL } from "../../../utils/config";
import AdminHeader from "../../../components/Header/AdminHeader";
import AdminSidebar from "../../../components/Header/AdminSidebar";
import useFetch from "../../../hooks/useFetch";
const MediaAdmin = () => {
  const [photo, setPhoto] = useState();
  const [file, setFile] = useState();
  const { data: images } = useFetch(`${BASE_URL}/media`);
  const formData = new FormData();

  formData.append("file", file);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/media/`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          role: "admin",
        },
        body: formData,
      });
      // const result = await res.json();
      // if (!res.ok) alert(result.message);
      window.location.reload();
      // console.log(result);
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeClick = async (e) => {
    e.preventDefault();
    const filename = photo.replace(/^.*[\\/]/, "");
    console.log(photo);
    try {
      await fetch(`${BASE_URL}/media-del`, {
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          role: "admin",
        },
        body: JSON.stringify(photo),
      });
    } catch (err) {
      // alert(err.message);
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
              <h4>Manage Media</h4>
            </div>
            <Row>
              <Col>
                <form
                  method="post"
                  encType="multipart/form-data"
                  onSubmit={handleClick}
                  className="d-flex"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*"
                  />
                  <Button className="btn btn-primary" type="submit">
                    Upload
                  </Button>
                </form>
                <hr />
                <div className="d-flex flex-wrap media">
                  {images?.map((pic, key) => (
                    <div className="card m-2" key={key}>
                      <div className="media-wrapper">
                        <img src={`/uploads/${pic}`} alt="a" />
                      </div>
                      <div className="card-body p-1 d-flex justify-content-center">
                        <a
                          href={`/uploads/${pic}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-primary me-2"
                        >
                          <i className="ri-eye-line"></i>
                        </a>
                        <form onSubmit={removeClick}>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={(e) => setPhoto(pic)}
                            type="submit"
                          >
                            <i className="ri-delete-bin-5-line"></i>
                          </button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    </>
  );
};
export default MediaAdmin;
