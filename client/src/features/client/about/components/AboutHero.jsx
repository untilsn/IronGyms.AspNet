import { Images } from "../../../../assets/images";
import PageHero from "../../../../components/common/PageHero";

export default function AboutHero() {
  return (
    <PageHero
      image={Images.aboutHero}
      imageAlt="Không gian phòng tập IronGyms"
      eyebrow="Tìm hiểu về"
      title="Về Chúng Tôi"
    />
  );
}
