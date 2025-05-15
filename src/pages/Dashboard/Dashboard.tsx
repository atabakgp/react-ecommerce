import "./Dashboard.scss";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="container">
        <div>Dashboard page</div>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}
export default Dashboard;
