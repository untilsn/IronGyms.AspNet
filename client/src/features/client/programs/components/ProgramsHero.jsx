import { Images } from "../../../../assets/images";
import PageHero from "../../../../components/common/PageHero";

export default function ProgramsHero() {
  return (
    <PageHero
      image={Images.program2}
      imageAlt="Vận động viên tập luyện sức mạnh"
      eyebrow="Được thiết kế cho hiệu suất"
      title={
        <>
          Chương Trình <br /> Tập Luyện
        </>
      }
    />
  );
}
