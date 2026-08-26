import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../../../api/dashboardApi";
import { useAuthStore } from "../../../store/useAuthStore";
import WelcomeCard from "./components/WelcomeCard";
import MembershipStatusCard from "./components/MembershipStatusCard";
import QuickActionsGrid from "./components/QuickActionsGrid";
import UpcomingScheduleCard from "./components/UpcomingScheduleCard";
import RecentCheckinsCard from "./components/RecentCheckinsCard";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  const { data: summary, isLoading } = useQuery({
    queryKey: ["dashboard", "member-summary"],
    queryFn: () => dashboardApi.getMemberSummary().then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WelcomeCard
        fullname={user?.fullname}
        activeMembership={summary?.activeMembership}
        checkinCount={summary?.totalCheckIns ?? 0}
      />

      <QuickActionsGrid />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <MembershipStatusCard membership={summary?.activeMembership} />
        <UpcomingScheduleCard schedules={summary?.upcomingSchedules ?? []} />
        <RecentCheckinsCard checkins={summary?.recentCheckIns ?? []} />
      </div>
    </div>
  );
}
