import React from 'react'
import WCLLogo from "../assets/images/logo.png"
import { FaExternalLinkAlt } from "react-icons/fa";

const Footer = () => {

  return (
    <div>
      <div className="footer-section">
        <div className="footer-container">


          <div className="footer-cta">
            <div style={{ display: "none" }}>

              <a href="https://clustrmaps.com/site/1by8e" title="Visit tracker">
                <img src="//www.clustrmaps.com/map_v2.png?d=zNzFcEcqWq6c1Xwy2x6RUJ2uRg9mdae-FKKa0GVhMt4&cl=ffffff" alt="Visitor map" /></a>

            </div>

          </div>

        </div>


        <div className="copyright_container">
          <div className="copyright-text">
            <p>&copy; 2024 World Bank Group.</p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer