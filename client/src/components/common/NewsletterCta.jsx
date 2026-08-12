import { Images } from "../../assets/images";

export default function NewsletterCta() {
  return (
    <section className="container mt-24 px-0">
      <div className="flex flex-col overflow-hidden rounded-3xl bg-base-200 md:flex-row">
        <div className="flex-1 p-12 md:p-20">
          <h2 className="font-display mb-6 text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
            Gia Nhập <br />
            <span className="text-primary">Đội Ngũ Tiên Phong.</span>
          </h2>
          <p className="mb-8 max-w-md text-lg text-base-content/60">
            Nhận thông tin tập luyện độc quyền, phân tích chuyên sâu và ưu tiên
            trải nghiệm chương trình mới trước tiên.
          </p>
          <form className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="input flex-1 rounded-lg border-none bg-base-300 px-6 py-4 text-base-content placeholder:text-base-content/40 focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="font-display rounded-lg bg-primary px-8 py-4 font-bold uppercase tracking-tight text-primary-content transition-colors hover:bg-accent hover:text-accent-content"
            >
              Đăng ký
            </button>
          </form>
        </div>

        <div className="editorial-clip relative hidden w-1/3 bg-primary/20 md:block">
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
