import { Images } from "../../../assets/images";
import AlternatingSection from "./components/AlternatingSection";
import BrandsCarousel from "./components/BrandsCarousel";
import AboutHero from "./components/AboutHero";

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <AlternatingSection
        title={
          <>
            Khởi Đầu <br /> Từ Đâu
          </>
        }
        description="IronGyms ra đời từ khát khao mang đến một không gian rèn luyện đúng nghĩa — nơi mỗi bài tập đều có mục đích, mỗi buổi tập đều tạo ra khác biệt thật sự cho cơ thể bạn."
        image={Images.aboutStory}
        imageAlt="Huấn luyện viên hướng dẫn học viên tập luyện"
        imageSide="right"
      />

      <AlternatingSection
        title={
          <>
            Hướng Đi <br /> Sắp Tới
          </>
        }
        description="Chúng tôi không ngừng mở rộng chương trình huấn luyện, nâng cấp cơ sở vật chất và xây dựng cộng đồng để mỗi hội viên đều có hành trình rèn luyện phù hợp nhất với mục tiêu của riêng mình."
        image={Images.aboutVision}
        imageAlt="Dụng cụ tạ kettlebell trong phòng gym"
        imageSide="left"
      />

      <BrandsCarousel />
    </>
  );
}
