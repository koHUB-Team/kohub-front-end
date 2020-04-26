import React, { Component } from "react";
import "./NotFound.scss";
class NotFound extends Component {
  render() {
    return (
      <div className="NotFound-area">
        <div className="NotFound-container">
          <h1>404</h1>
          <h2>Page not Found</h2>
          <div>
            <button>Main Page</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
