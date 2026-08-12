import { Dumbbell, HandFist, Podium } from "lucide-react";
import { Images } from "../../../assets/images";

export const trainerStats = [
  { value: "10+", label: "Huấn luyện viên chứng chỉ" },
  { value: "2.500+", label: "Học viên thay đổi vóc dáng" },
  { value: "4.9", label: "Đánh giá trên Google" },
];

export const trainers = [
  {
    id: "emma-lewis",
    name: "Emma Lewis",
    title: "Chuyên gia Functional Training",
    location: "IronGyms Q1",
    bio: "Năng động, giàu năng lượng và đam mê chuyển động. Emma xây dựng các bài tập functional giúp bạn khoẻ mạnh mỗi ngày. Mỗi buổi tập đều có sự vận động, mồ hôi và động lực.",
    tags: ["Mobility", "Core Stability", "Group Workouts"],
    image: Images.trainer1,
    socials: [
      { type: "instagram", url: "https://instagram.com" },
      { type: "facebook", url: "https://facebook.com" },
      { type: "mail", url: "mailto:info@irongyms.com" },
    ],
  },
  {
    id: "marcus-thorne",
    name: "Marcus Thorne",
    title: "Head of Performance",
    location: "IronGyms Q1",
    bio: "Hơn 12 năm huấn luyện đỉnh cao, chuyên sâu Olympic lifting và tối ưu cơ sinh học. Marcus giúp bạn nâng mức tạ và hiệu suất lên tầm cao mới.",
    tags: ["Strength", "Olympic Lifting", "1-1 Coaching"],
    image: Images.trainer2,
    socials: [
      { type: "instagram", url: "https://instagram.com" },
      { type: "facebook", url: "https://facebook.com" },
      { type: "mail", url: "mailto:info@irongyms.com" },
    ],
  },
  {
    id: "julian-kross",
    name: "Julian Kross",
    title: "Chuyên gia Mobility",
    location: "IronGyms Q1",
    bio: "Bậc thầy về functional range conditioning và phục hồi vận động. Julian giúp bạn tập luyện bền vững, không chấn thương, hiệu quả lâu dài.",
    tags: ["Recovery", "Flexibility", "Injury Prevention"],
    image: Images.trainer3,
    socials: [
      { type: "instagram", url: "https://instagram.com" },
      { type: "facebook", url: "https://facebook.com" },
      { type: "mail", url: "mailto:info@irongyms.com" },
    ],
  },
];

export const trainWithUsFeatures = [
  {
    id: "coaches",
    icon: Dumbbell,
    label: "Huấn luyện viên giàu kinh nghiệm",
    image: Images.program1,
  },
  {
    id: "plans",
    icon: HandFist,
    label: "Giáo án cá nhân hoá cho mọi người",
    image: Images.program2,
  },
  {
    id: "tracking",
    icon: Podium,
    label: "Theo dõi tiến độ thực tế",
    image: Images.program3,
  },
];

export const whyChooseUs = [
  "Chuyên gia có chứng chỉ. Hướng dẫn từ những người giỏi nhất.",
  "Giáo án cá nhân hoá. Đạt được mục tiêu riêng của bạn.",
  "Đồng hành tận tâm. Luôn có động lực và đúng hướng.",
  "Kết quả thực tế. Cảm nhận sự khác biệt rõ rệt.",
  "Chú trọng từng cá nhân. Mục tiêu của bạn là ưu tiên hàng đầu.",
  "Cộng đồng hỗ trợ. Tập luyện cùng những người có cùng động lực.",
  "Chỉ dẫn chuẩn kỹ thuật. Đảm bảo an toàn và hiệu quả.",
  "Thay đổi bền vững. Kết quả vượt xa vẻ bề ngoài.",
];

export const successStories = [
  {
    id: "sarah",
    name: "Sarah",
    trainedBy: "Julian Kross",
    rating: 4,
    quote:
      "Tôi giảm 20kg chỉ trong 7 tháng và thực sự cảm thấy như một phiên bản mới của mình. Julian luôn hỗ trợ, theo sát và điều chỉnh bài tập phù hợp với nhịp độ của tôi.",
    photo: Images.reviewer1,
  },
  {
    id: "david",
    name: "David",
    trainedBy: "Marcus Thorne",
    rating: 5,
    quote:
      "Marcus thay đổi hoàn toàn cách tôi hiểu về sức mạnh. Không chỉ là tập gym, đó là một hành trình rèn luyện có hệ thống.",
    photo: Images.reviewer2,
  },
  {
    id: "linh",
    name: "Linh",
    trainedBy: "Emma Lewis",
    rating: 5,
    quote:
      "Emma giúp tôi duy trì thói quen tập luyện đều đặn lần đầu tiên trong đời. Các bài tập luôn mới mẻ và đầy năng lượng.",
    photo: Images.reviewer3,
  },
];
