import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BASE_URL } from "../../../utils/config";
import AdminHeader from "../../../components/Header/AdminHeader";
import AdminSidebar from "../../../components/Header/AdminSidebar";
import useFetch from "../../../hooks/useFetch";
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
const ToursEditAdmin = () => {
  const [tour, setTour] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    price: "",
    maxGroupSize: "",
    desc: "",
    hotel: "",
    photo: "",
    featured: "",
  });
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch(`${BASE_URL}/tours/${id}`);
      const res = await req.json();
      setTour(res.data);
    };
    fetchData();
  }, [id]);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleChange = (e) => {
    setTour({ ...tour, [e.target.id]: e.target.value });
  };
  const inputHandler = (event, editor) => {
    setTour((v) => ({ ...v, desc: editor.getData() }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          role: "admin",
        },
        body: JSON.stringify(tour),
      });
      const result = await res.json();
      if (!res.ok) alert(result.message);
      alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };

  const { data: images } = useFetch(`${BASE_URL}/media`);
  const selectPhoto = async (pic) => {
    const filename = pic.replace(/^.*[\\/]/, "");
    setTour((v) => ({ ...v, photo: filename }));
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
              <h4>Tour Details</h4>
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
                      value={tour.title}
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
                      value={tour.city}
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
                      value={tour.address}
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
                      value={tour.distance}
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
                      value={tour.price}
                      required
                      id="price"
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
                      placeholder="Max People"
                      value={tour.maxGroupSize}
                      required
                      id="maxGroupSize"
                      min="1"
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
                      value={tour.hotel}
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
                      defaultValue={tour.featured}
                      onChange={handleChange}
                    >
                      <option value="false">Normal</option>
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
                      value={tour.photo}
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
                      editor={ClassicEditor}
                      data={tour.desc}
                      onChange={inputHandler}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button className="btn btn-primary" type="submit">
                Update Tour
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToursEditAdmin;
