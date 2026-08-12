import { MapPin } from "lucide-react";
import { Images } from "../../../../assets/images";

export default function LocationCard() {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-box shadow-2xl">
      <div className="absolute inset-0 z-10 bg-base-100/40 transition-colors duration-500 group-hover:bg-base-100/20" />
      <img
        src={Images.contactMap}
        alt="Bản đồ khu vực phòng gym"
        className="h-full w-full object-cover brightness-50 contrast-125 grayscale"
      />
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4 rounded-field bg-primary p-4">
        <MapPin size={26} className="text-primary-content" />
        <div className="text-primary-content">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
            Địa chỉ
          </p>
          <p className="font-bold">77 Đường Công Nghiệp, Q. Bình Thạnh</p>
        </div>
      </div>
    </div>
  );
}
