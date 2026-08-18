export const pricingPlans = [
  {
    id: "basic",
    name: "Cơ Bản",
    price: "500K",
    period: "/ tháng",
    highlighted: false,
    features: ["Truy cập phòng tập 24/7", "Sử dụng phòng thay đồ", "Dùng thiết bị cơ bản"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "890K",
    period: "/ tháng",
    highlighted: true,
    note: "Lộ trình được lựa chọn nhiều nhất.",
    features: [
      "Toàn bộ tính năng gói Cơ Bản",
      "Không giới hạn lớp nhóm",
      "Đánh giá thể lực định kỳ",
      "2 vé mời khách/tháng",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "1.490K",
    period: "/ tháng",
    highlighted: false,
    features: [
      "Toàn bộ tính năng gói Pro",
      "2 buổi PT cá nhân/tháng",
      "Sử dụng khu phục hồi",
      "Tư vấn dinh dưỡng riêng",
    ],
  },
];

export const comparisonRows = [
  {
    label: "Truy cập toàn bộ phòng tập",
    basic: true,
    pro: true,
    premium: true,
  },
  { label: "Lớp tập nhóm", basic: false, pro: true, premium: true },
  {
    label: "Theo dõi tiến độ tập luyện",
    basic: true,
    pro: true,
    premium: true,
  },
  { label: "Khu phục hồi & Sauna", basic: false, pro: false, premium: true },
  { label: "Tư vấn dinh dưỡng", basic: false, pro: false, premium: true },
  {
    label: "Buổi tập với PT",
    basic: "—",
    pro: "Ưu đãi giảm giá",
    premium: "2 buổi/tháng",
  },
];
