import { Images } from "../../../../assets/images";
import PageHero from "../../../../components/common/PageHero";

export default function TrainersHero() {
  return (
    <PageHero
      image={Images.hero}
      imageAlt="Huấn luyện viên hướng dẫn học viên"
      eyebrow="Đội ngũ dẫn dắt"
      title="Dẫn Lối Đến Mục Tiêu Lớn"
    />
  );
}
