import { Images } from "../../assets/images";

export default function NewsletterCta() {
  return (
    <section className="container mt-24 px-0">
      <div className="bg-base-200 flex flex-col overflow-hidden rounded-3xl md:flex-row">
        <div className="flex-1 p-12 md:p-20">
          <h2 className="font-display mb-6 text-4xl leading-none font-black tracking-tight uppercase md:text-6xl">
            Gia Nhập <br />
            <span className="text-primary">Đội Ngũ Tiên Phong.</span>
          </h2>
          <p className="text-base-content/60 mb-8 max-w-md text-lg">
            Nhận thông tin tập luyện độc quyền, phân tích chuyên sâu và ưu tiên trải nghiệm chương
            trình mới trước tiên.
          </p>
          <form className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="input bg-base-300 text-base-content placeholder:text-base-content/40 focus:ring-primary flex-1 rounded-lg border-none px-6 py-4 focus:ring-2"
            />
            <button
              type="submit"
              className="font-display bg-primary text-primary-content hover:bg-accent hover:text-accent-content rounded-lg px-8 py-4 font-bold tracking-tight uppercase transition-colors"
            >
              Đăng ký
            </button>
          </form>
        </div>

        <div className="editorial-clip bg-primary/20 relative hidden w-1/3 md:block">
          <img
            src={Images.parallax}
            alt="Cộng đồng IronGyms"
            className="h-full w-full object-cover opacity-60 mix-blend-overlay grayscale"
          />
        </div>
      </div>
    </section>
  );
}
