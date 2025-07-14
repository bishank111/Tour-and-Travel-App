import React, { useRef, useState } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import ReactSlider from "react-slider";

const SearchBar = () => {
  const locationRef = useRef("");
  const maxGroupSizeRef = useRef(0);
  const durationRef = useRef(0);
  const navigate = useNavigate();
  const MIN = 0;
  const MAX = 10000;
  const [values, setValues] = useState([MIN, MAX]);
  const searchHandler = async () => {
    const location = locationRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;
    const duration = durationRef.current.value;
    if (location === "" || maxGroupSize === "" || duration === "") {
      return alert("location, max people and duration fields are required!");
    }

    const res = await fetch(
      `${BASE_URL}/tours/search/getTourBySearch?city=${location}&maxGroupSize=${maxGroupSize}&duration=${duration}&minPrice=${values[0]}&maxPrice=${values[1]}`
    );

    if (!res.ok) alert("Something went wrong");

    const result = await res.json();

    navigate(
      `/tours/search?city=${location}&maxGroupSize=${maxGroupSize}&duration=${duration}&minPrice=${values[0]}&maxPrice=${values[1]}`,
      {
        state: result.data,
      }
    );
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-3">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-time-line"></i>
            </span>
            <div>
              <h6>Duration</h6>
              <input type="number" placeholder="0" ref={durationRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-money-dollar-circle-line"></i>
            </span>
            <div>
              <h6>
                Price Range: {values[0]} to {values[1]}
              </h6>
              <ReactSlider
                onChange={setValues}
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={values}
                ariaLabel={["Lower thumb", "Upper thumb"]}
                ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                pearling
                minDistance={10}
                min={MIN}
                max={MAX}
                value={values}
              />
            </div>
          </FormGroup>

          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
