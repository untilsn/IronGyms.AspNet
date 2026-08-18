import { useQuery } from "@tanstack/react-query";
import { registrationsApi } from "../../../api/registrationsApi";
import { checkinsApi } from "../../../api/checkinsApi";
import { schedulesApi } from "../../../api/schedulesApi";
import WelcomeCard from "./components/WelcomeCard";
import MembershipStatusCard from "./components/MembershipStatusCard";
import QuickActionsGrid from "./components/QuickActionsGrid";
import UpcomingScheduleCard from "./components/UpcomingScheduleCard";
import RecentCheckinsCard from "./components/RecentCheckinsCard";
import { useMemberProfile } from "../../../hooks/useMemberProfile";

export default function DashboardPage() {
  const { data: member, isLoading: loadingMember } = useMemberProfile();
  const memberId = member?.id;

  const { data: memberships = [] } = useQuery({
    queryKey: ["registrations", memberId],
    queryFn: () => registrationsApi.getByMember(memberId).then((r) => r.data),
    enabled: !!memberId,
  });

  const { data: checkins = [] } = useQuery({
    queryKey: ["checkins", memberId],
    queryFn: () => checkinsApi.getByMember(memberId).then((r) => r.data),
    enabled: !!memberId,
  });

  const { data: schedules = [] } = useQuery({
    queryKey: ["schedules", memberId],
    queryFn: () => schedulesApi.getByMember(memberId).then((r) => r.data),
    enabled: !!memberId,
  });

  if (loadingMember) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const activeMembership = memberships.find((m) => m.status === 0);

  return (
    <div className="space-y-6">
      <WelcomeCard
        fullname={member?.user?.fullname}
        activeMembership={activeMembership}
        checkinCount={checkins.length}
      />

      <QuickActionsGrid />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <MembershipStatusCard membership={activeMembership} />
        <UpcomingScheduleCard schedules={schedules} />
        <RecentCheckinsCard checkins={checkins} />
      </div>
    </div>
  );
}
