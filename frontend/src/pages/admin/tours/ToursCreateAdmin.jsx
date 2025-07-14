import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BASE_URL } from "../../../utils/config";
import "../../../styles/media.css";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { AuthContext } from "../../../context/AuthContext";
import AdminHeader from "../../../components/Header/AdminHeader";
import AdminSidebar from "../../../components/Header/AdminSidebar";
import useFetch from "../../../hooks/useFetch";
const ToursCreateAdmin = () => {
  //   const [pic, setPic] = useState();
  const [toursData, setToursData] = useState({
    title: undefined,
    city: undefined,
    address: undefined,
    distance: undefined,
    price: undefined,
    maxGroupSize: undefined,
    days: undefined,
    desc: undefined,
    hotel: undefined,
    photo: undefined,
    featured: false,
  });
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleChange = (e) => {
    setToursData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const inputHandler = (event, editor) => {
    console.log(editor.getData());
    setToursData((v) => ({ ...v, desc: editor.getData() }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/tours`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          role: "admin",
        },
        body: JSON.stringify(toursData),
      });

      const result = await res.json();

      if (!res.ok) alert(result.message);

      // dispatch({ type: "REGISTER_SUCCESS" });
      console.log(result);
      navigate("/admin/tours");
    } catch (err) {
      alert(err.message);
    }
  };

  const { data: images } = useFetch(`${BASE_URL}/media`);
  const selectPhoto = async (pic) => {
    const filename = pic.replace(/^.*[\\/]/, "");
    setToursData((v) => ({ ...v, photo: filename }));
    setModal(false);
    console.log(filename);
  };
  return (
    <>
      <AdminHeader />
      <div className="container-fluid max-h-100">
        <div className="row h-100">
          <div className="col-md-2 sidebar">
            <AdminSidebar></AdminSidebar>
          </div>
          <div className="col-md-10">
            <div className="d-flex justify-content-between py-3">
              <h4>Add Tour</h4>
              <Link className={"btn btn-info"} to={`/admin/tours`}>
                Tours List
              </Link>
            </div>
            <Form onSubmit={handleClick}>
              <Row>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Tour Name"
                      required
                      id="title"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="City"
                      required
                      id="city"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Address"
                      required
                      id="address"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="number"
                      placeholder="Duration"
                      required
                      id="distance"
                      min="1"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="number"
                      placeholder="Price"
                      min="0"
                      required
                      id="price"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="number"
                      placeholder="Max People"
                      min="1"
                      required
                      id="maxGroupSize"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Hotel"
                      required
                      id="hotel"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <FormGroup className="">
                    <select
                      className="form-select"
                      id="featured"
                      onChange={handleChange}
                    >
                      <option value="false" defaultValue="false">
                        Normal
                      </option>
                    </select>
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <div class="input-group mb-3">
                    <input
                      id="photo"
                      type="text"
                      class="form-control"
                      placeholder="select photo"
                      value={toursData.photo}
                      onChange={handleChange}
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      onClick={toggle}
                    >
                      Photo
                    </button>
                  </div>

                  <Modal
                    isOpen={modal}
                    toggle={toggle}
                    size="lg"
                    scrollable="true"
                  >
                    <ModalHeader toggle={toggle}>Select Photo</ModalHeader>
                    <ModalBody>
                      <div className="d-flex flex-wrap media">
                        {images?.map((pic, key) => (
                          <div className="card m-2" key={key}>
                            <div className="media-wrapper">
                              <img
                                src={`/uploads/${pic}`}
                                alt="a"
                                onClick={(e) => selectPhoto(pic)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Col>
              </Row>
              <Row>
                <Col className="mb-3">
                  <FormGroup>
                    <CKEditor
                      id="desc"
                      editor={ClassicEditor}
                      data={""}
                      onChange={inputHandler}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button className="btn btn-primary" type="submit">
                Add Tour
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToursCreateAdmin;
