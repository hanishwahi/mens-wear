import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container } from "react-bootstrap";
function Card({ data, title }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Container fluid="xl">
        <div className="latest-product-main">
          <div className="latest-product-heading">
            <h1>{title}</h1>
          </div>
          <div className="border-bottom">
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              // customTransition="all .5"
              // transitionDuration={2000}
              containerclassName="carousel-container"
              dotListclassName="custom-dot-list-style"
              itemclassName="carousel-item-padding-40-px"
            >
              {data.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="mb-3 col-lg-11 col-11 border-0">
                      <Link
                        to={`/mens/${item.title}/${item._id}`}
                        onClick={scrollTop}
                        className="text-decoration-none"
                      >
                        <div className="card ">
                          <div className="latest-product-img">
                            <img
                              src={item.images[0]}
                              className="card-img-top border"
                              alt={item.images[0]}
                            />
                          </div>
                          <div className="latest-product-off">
                            <h1>Off {item.discountPercentage} %</h1>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">
                              {item.title.toUpperCase()}
                            </h5>
                            <div className="d-flex gap-3 align-items-center">
                              <div className="card-text1">
                                <del>MRP: {item.price}/- </del>
                              </div>
                              <p className="card-text">
                                ₹{" "}
                                {Math.ceil(
                                  item.price -
                                    (item.price / 100) * item.discountPercentage
                                )}
                                /-
                              </p>
                            </div>
                            <div>
                              {" "}
                              <p className="text-success">
                                you saved ₹{" "}
                                {Math.floor(
                                  (item.price / 100) * item.discountPercentage
                                )}{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </React.Fragment>
                );
              })}
            </Carousel>
          </div>
        </div>
      </Container>
    </>
  );
}
export default Card;
