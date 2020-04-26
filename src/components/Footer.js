import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="kohub-footer">
          <div className="kohub-footer__menu">
            <span className="kohub-footer__logo blind">koHUB</span>
            <div className="kohub-footer__content">
              <h3>
                <Link to="">koHUB Team</Link>
              </h3>
              <h3>
                <Link to="">개인정보처리방침</Link>
              </h3>
              <h3>
                <Link to="">사이트맵</Link>
              </h3>
            </div>
          </div>
          <p className="kohub-footer__email">Email : kohubmanager@gmail.com</p>
          <p>Copyright 2020. koHUB Team all rights reserved.</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
