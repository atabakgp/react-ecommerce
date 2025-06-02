import "./Profile.scss";
import { Link } from "react-router-dom";
import ProfileForm from "../../components/Profile/ProfileForm";
import EmailForm from "../../components/Profile/EmailForm";
import ChangePasswordForm from "../../components/Profile/ChangePasswordForm";

function Profile() {
  return (
    <div className="profile">
      <div className="container">
        <div className="profile-container">
          <div>
            <ProfileForm />
          </div>
          <div>
            <EmailForm />
          </div>
          <div>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
