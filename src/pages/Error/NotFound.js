import React, { Component } from "react";
import "./NotFound.scss";
class NotFound extends Component {
  render() {
    return (
      <div className="kohub-notfound">
        <div className="kohub-notfound__content align-center-col">
          <div>
            <h1>404</h1>
          </div>
          <div className="kohub-notfound__subtitle">
            <h2>Page not Found</h2>
          </div>
          <div className="kohub-notfound__button">
            <button>Main Page</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
