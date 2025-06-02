import "./Dashboard.scss";
import { Link } from "react-router-dom";
import ProfileForm from "../../components/Profile/ProfileForm";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="container">
        <ProfileForm/>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}
export default Dashboard;
