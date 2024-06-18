import React from "react";
import "../AboutMe.css"; // Import CSS file for styling
import im1 from "../p1.jpeg";
import im2 from "../p2.jpeg";
import im3 from "../p3.jpeg";

const About = () => {
  return (
    <div className="about-me-container">
      <div className="about-me-content">
        <div className="about-me-text">
          <h2>Welcome to Your Transformation Journey!</h2>

          <p>
            Thank you for taking the first step towards a healthier, stronger,
            and more vibrant you. I am thrilled to potentially embark on this
            transformative fitness journey together. As an online coach I
            believe in personalized fitness solutions tailored to your unique
            goals, needs, and lifestyle. Whether you're aiming to build muscle,
            shed those extra pounds, boost your energy, or simply enhance your
            overall well-being.
          </p>

          <p>
            Through this platform, I aspire to share my knowledge and experience
            to help you accelerate your progress in fitness. Having navigated my
            own path in the realm of training, I understand the challenges and
            intricacies involved. My goal is to empower you with the insights
            and strategies I've honed over the years, enabling you to achieve
            your fitness goals faster and more efficiently than I did.
          </p>
          <p>
            Join me on this exhilarating journey as we defy gravity, push our
            limits, and unlock the incredible potential of our bodies. Together,
            let's sculpt not just our physiques, but also our minds, as we
            embrace the transformative power of calisthenics.
          </p>
          <p>
            But more than just achieving physical fitness, our journey together
            is about embracing a healthier, happier lifestyle that lasts. By
            sharing my own transformation journey and leveraging my expertise,
            I'm here to sculpt the best version of yourself – inside and out.
          </p>
          <p>Welcome aboard, and let's soar to new heights together!</p>
        </div>
        <div className="about-me-images">
          <img src="https://sousa.s3.amazonaws.com/p1.jpeg" alt="Image 1" />
          <img src="https://sousa.s3.amazonaws.com/p2.jpeg" alt="Image 2" />
          <img src="https://sousa.s3.amazonaws.com/p3.jpeg" alt="Image 3" />
        </div>
      </div>
    </div>
  );
};

export default About;
