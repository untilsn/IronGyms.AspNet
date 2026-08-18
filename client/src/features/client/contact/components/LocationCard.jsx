import { MapPin } from "lucide-react";
import { Images } from "../../../../assets/images";

export default function LocationCard() {
  return (
    <div className="group rounded-box relative aspect-square overflow-hidden shadow-2xl">
      <div className="bg-base-100/40 group-hover:bg-base-100/20 absolute inset-0 z-10 transition-colors duration-500" />
      <img
        src={Images.contactMap}
        alt="Bản đồ khu vực phòng gym"
        className="h-full w-full object-cover brightness-50 contrast-125 grayscale"
      />
      <div className="rounded-field bg-primary absolute bottom-6 left-6 z-20 flex items-center gap-4 p-4">
        <MapPin size={26} className="text-primary-content" />
        <div className="text-primary-content">
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-80">Địa chỉ</p>
          <p className="font-bold">77 Đường Công Nghiệp, Q. Bình Thạnh</p>
        </div>
      </div>
    </div>
  );
}
