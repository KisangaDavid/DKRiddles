import LeaderboardCard from "./LeaderboardCard";
import TopBar from "../_common/TopBar";

function ProfilePage() {

   return (
    <>
        <TopBar
          text="Leaderboard"
          isPuzzlePage={false}
          resetFunc={undefined}
        />
      <LeaderboardCard />
    </>
  );
}

export default ProfilePage;
