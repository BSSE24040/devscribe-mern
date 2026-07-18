import { Link } from "react-router-dom";
import "../styles/NotFound.css";

const NotFoundPage = () => {
  return (
    <div className="page-container not-found">
      <h1>404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default NotFoundPage;
