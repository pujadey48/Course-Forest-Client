import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import LeftSideNav from "../Courses/LeftSideNav/LeftSideNav";
import JsPDF from "jspdf";
import { FaArrowRight } from "react-icons/fa";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const course = useLoaderData();
  let { id } = useParams();
  

  function createMarkup(htmlString) {
    return { __html: htmlString };
  }

  const generatePDF = () => {
    const details = new JsPDF("portrait", "pt", "a4");
    details.html(document.querySelector(".details")).then(() => {
        details.save("details.pdf");
    });
  };

  return (
    <Container className="mb-5">
      <Row>
        <Col lg="4">
          <LeftSideNav></LeftSideNav>
        </Col>
        {course.err_msg && (
          <Col lg="8">
            <h2>{course?.err_msg}</h2>
          </Col>
        )}
        {course.name && (
          <Col lg="8" className="details">
            <button onClick={generatePDF} type="button">
              Generate PDF
            </button>
            <h2>{course.name}</h2>
            <img src={course.image_url} className="img-fluid" alt="..."></img>
            <p className="text-muted mb-1 mt-2">
              Rating:{course.rating.number} Badge:{course.rating.badge}
            </p>
            <p className="fw-bold fs-3">Price: {course.price}</p>
            <div dangerouslySetInnerHTML={createMarkup(course.details)} />
            {/* <p>{course.details}</p> */}
            {/* <button type="button" class="btn btn-primary">
              CheckOut
            </button> */}
            <Link to={"/checkOut/"+id} className="btn btn-primary">
            Checkout premium access <FaArrowRight></FaArrowRight>
          </Link>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CourseDetails;
