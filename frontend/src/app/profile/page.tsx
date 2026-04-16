import ProfileCard from "./ProfileCard";
import TopBar from "../_common/TopBar";

function ProfilePage() {

   return (
    <>
        <TopBar
          text="Profile"
          isPuzzlePage={false}
          resetFunc={undefined}
        />
      <ProfileCard />
    </>
  );
}

export default ProfilePage;
