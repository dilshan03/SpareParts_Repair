import React from "react";
import carImage from "../assets/car.jpg"; // Make sure car.jpg is inside /src/assets/

const Hero = () => {
  return (
    <section className="hero container">
      <div className="hero-text">
        <h1>WELCOME TO <br></br>COSMO EXPORTS</h1>
        <p></p>
      </div>
      <img src={carImage} alt="Car" />
    </section>
  );
};

export default Hero;
