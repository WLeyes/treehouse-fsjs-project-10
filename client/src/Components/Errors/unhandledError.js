import React from "react";
import Fade from "react-reveal/Fade";

const UnhandledError = () => (
  <Fade bottom left big>
    <div className="bounds">
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
    </div>
  </Fade>
);

export default UnhandledError;
