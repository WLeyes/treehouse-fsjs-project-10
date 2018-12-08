import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const NewCourse = () => {
  return (
    <div className="grid-33">
      <Fade right big>
        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <h3 className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
            </svg>
            New Course
          </h3>
        </Link>
      </Fade>
    </div>
  );
};

export default NewCourse;
