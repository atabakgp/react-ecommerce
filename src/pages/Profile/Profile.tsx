import "./Profile.scss";
import ProfileForm from "../../components/profile/profileForm";
import EmailForm from "../../components/profile/emailForm";
import ChangePasswordForm from "../../components/profile/changePasswordForm";

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
