import { Images } from "../../../assets/images";

export const categories = [
  { id: "all", label: "Tất cả" },
  { id: "strength", label: "Sức mạnh" },
  { id: "endurance", label: "Sức bền" },
  { id: "mobility", label: "Linh hoạt" },
];

export const programs = [
  {
    id: "crossfit",
    title: "CrossFit",
    category: "strength",
    level: "Nâng cao",
    description:
      "Các bài tập chức năng cường độ cao, rèn luyện thể lực toàn diện và sức mạnh bùng nổ.",
    image: Images.program1,
    featured: false,
  },
  {
    id: "endurance-run",
    title: "Sức Bền",
    category: "endurance",
    level: "Trung cấp",
    description:
      "Nâng cao sức bền tim mạch và khả năng chịu đựng qua các bài tập conditioning chuyên sâu.",
    image: Images.program2,
    featured: false,
  },
  {
    id: "mobility-flow",
    title: "Mobility Flow",
    category: "mobility",
    level: "Mọi cấp độ",
    description:
      "Hệ thống giãn cơ phục hồi và bài tập tăng biên độ vận động, giải phóng toàn bộ tiềm năng cơ thể bạn.",
    image: Images.program3,
    featured: true,
  },
];
