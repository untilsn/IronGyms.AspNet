import { useQuery } from "@tanstack/react-query";
import { membersApi } from "../api/membersApi";

//hook gốc, mọi component con dùng lại
export function useMemberProfile() {
  return useQuery({
    queryKey: ["members", "me"],
    queryFn: () => membersApi.getMe().then((res) => res.data),
  });
}
