import React from 'react';


// it won't show big red error in production, only in dev https://stackoverflow.com/questions/52096804/react-still-showing-errors-after-catching-with-errorboundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch(error, info) {
    this.setState({ error: true });
    console.log("error: ", error);
    console.log("info: ", info);
  }

  render() {
    if (this.state.error) {
      return <h1>Sorry! Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
