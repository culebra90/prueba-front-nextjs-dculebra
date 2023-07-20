const ErrorPage = ({ statusCode }:any) => {
    if (statusCode === 404) {
      return (
        <div>
          <h1>Error 404</h1>
          <p>Oops! This page could not be found.</p>
        </div>
      );
    }
  
    return (
      <div>
        <h1>Error {statusCode}</h1>
        <p>Oops! Something went wrong.</p>
      </div>
    );
  };
  
  export default ErrorPage;
  