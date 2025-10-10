import ProfileForm from "../../components/profile/profileForm";
import EmailForm from "../../components/profile/emailForm";
import ChangePasswordForm from "../../components/profile/changePasswordForm";

function Profile() {
  return (
    <div className="min-h-screen py-8">
      <div className="grid grid-cols-2 gap-8">
        {/* Profile Form */}
        <ProfileForm />

        {/* Email Form */}
        <EmailForm />

        {/* Change Password Form */}
        <ChangePasswordForm />
      </div>
    </div>
  );
}

export default Profile;
