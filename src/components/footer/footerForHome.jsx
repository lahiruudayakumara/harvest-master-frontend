//import React from "react";
import "./footerForHome.css";
import footerTopImage from "../../assets/images/backgrounds/silhouette.png";
import facebook from "../../assets/images/sm__icons/facebook_yel.png";
import twitter from "../../assets/images/sm__icons/twitter_yel.png";
import linkedin from "../../assets/images/sm__icons/linkedin_yel.png";
import instagram from "../../assets/images/sm__icons/instagram_yel.png";

const FooterForHome = () => {
  return (
    <div className="footer-parent">
      <div className="footer-top">
        <div className="liner-gradient"></div>
      </div>
      <div className="footer-top-image">
        <img src={footerTopImage} alt="silhouettte" />
      </div>
      <div className="footer">
        <div className="sb__footer section__padding">
          <div className="sb__footer-links">
            <div className="sb__footer-links-div">
              <h4>COMPANY</h4>
              <hr />
              <a href="#">
                <p>About Us</p>
              </a>
              <a href="#">
                <p>Our Team</p>
              </a>
              <a href="#">
                <p>Partners</p>
              </a>
            </div>
            <div className="sb__footer-links-div">
              <h4>SUPPORT</h4>
              <hr />
              <a href="#">
                <p>Contact Us</p>
              </a>
              <a href="#">
                <p>FAQ</p>
              </a>
              <a href="#">
                <p>Feedback</p>
              </a>
            </div>
            <div className="sb__footer-links-div">
              <h4>SERVICES</h4>
              <hr />
              <a href="#">
                <p>Pre-Harvest</p>
              </a>
              <a href="#">
                <p>Post-Harvest</p>
              </a>
              <a href="#">
                <p>Logistics</p>
              </a>
            </div>
            <div className="sb__footer-links-div">
              <h4>PRODUCTS</h4>
              <hr />
              <a href="#">
                <p>Paddy Store</p>
              </a>
              <a href="#">
                <p>Bids</p>
              </a>
              <a href="#">
                <p>Cart</p>
              </a>
            </div>
            <div className="sb__footer-links-div-sm">
              <h4>SOCIAL LINKS</h4>
              <hr />
              <div className="socialmedia">
                <a href="#">
                  <img src={facebook} alt="facebook icon" />
                </a>
                <a href="#">
                  <img src={twitter} alt="twitter icon" />
                </a>
                <a href="#">
                  <img src={linkedin} alt="twitter icon" />
                </a>
                <a href="#">
                  <img src={instagram} alt="twitter icon" />
                </a>
              </div>
            </div>
          </div>

          <hr />

          <div className="sb__footer-below">
            <div className="sb__footer-copyright">
              <p>
                &copy; {new Date().getFullYear()} HarvestMaster. All right
                reserved.
              </p>
            </div>
            <div className="sb__footer-below-links">
              <a href="#">
                <p>Terms of Use</p>
              </a>
              <a href="#">
                <p>Privacy Policy</p>
              </a>
              <a href="#">
                <p>Cookie Policy</p>
              </a>
              <a href="#">
                <p>Security</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterForHome;
