import React from "react";
import Fade from "react-reveal/Fade";

const NotFound = () => (
  <Fade bottom left big>
    <div className="bounds">
      <h1>Not Found</h1>
      <p>Sorry! We couldn't find the page you're looking for.</p>
    </div>
  </Fade>
);

export default NotFound;
