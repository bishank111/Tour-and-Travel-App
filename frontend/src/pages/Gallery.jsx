import React, { useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/gallery.css";
import { Container, Row, Col } from "reactstrap";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import Footer from "../components/Footer/Footer";

const Gallery = () => {
  const { data: gallery, loading, error } = useFetch(`${BASE_URL}/gallery`);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <CommonSection title={"Gallery"} />
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading.....</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row className="mt-5">
              {gallery?.map((g) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={g._id}>
                  <img
                    className="w-100 img-thumbnail ga-img"
                    src={g.src}
                    alt=""
                  />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Gallery;
