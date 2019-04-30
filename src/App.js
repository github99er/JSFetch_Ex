import React from "react";
import ErrorBoundary from "./ErrorBoundary.js";
import NewClassComponent from "./NewClassComponent.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ErrorBoundary>
        <div className="App">
          <h1>CIT 382 19W React startup</h1>
          <NewClassComponent />
        </div>
      </ErrorBoundary>
    );
  }
}
