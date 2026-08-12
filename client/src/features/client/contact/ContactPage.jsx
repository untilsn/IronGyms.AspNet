import ContactForm from "./components/ContactForm";
import LocationCard from "./components/LocationCard";
import HoursInfo from "./components/HoursInfo";
import QuickContact from "./components/QuickContact";

export default function ContactPage() {
  return (
    <main className="container pb-32 pt-20">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="space-y-16 lg:col-span-7">
          <header className="space-y-6">
            <h1 className="font-display text-6xl font-black uppercase tracking-tight md:text-8xl">
              Kết Nối <br />
              <span className="text-primary">Với Chúng Tôi.</span>
            </h1>
            <p className="max-w-lg text-xl font-light leading-relaxed text-base-content/60">
              Dù bạn đang tìm huấn luyện viên riêng hay chỉ muốn ghé thăm không
              gian tập, chúng tôi luôn sẵn sàng đồng hành cùng bạn.
            </p>
          </header>

          <ContactForm />
        </div>

        <div className="space-y-12 lg:col-span-5">
          <LocationCard />
          <HoursInfo />
          <QuickContact />
        </div>
      </div>
    </main>
  );
}
