import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { inquiryTypes } from "../contactData";

const contactSchema = z.object({
  fullname: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  message: z.string().min(1, "Vui lòng nhập nội dung"),
});

export default function ContactForm() {
  const [inquiryType, setInquiryType] = useState(inquiryTypes[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) });

  // Chưa có API contact ở backend — tạm giả lập gửi thành công để hoàn thiện UI trước
  const submitMutation = useMutation({
    mutationFn: (values) => Promise.resolve(values),
    onSuccess: () => {
      toast.success("Đã gửi yêu cầu, chúng tôi sẽ liên hệ sớm nhất!");
      reset();
    },
  });

  const onSubmit = (values) =>
    submitMutation.mutate({ ...values, inquiryType });

  return (
    <section className="surface-card rounded-box p-8 md:p-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-bold uppercase tracking-widest text-primary">
                Họ và tên
              </span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="Nguyễn Văn A"
              {...register("fullname")}
            />
            {errors.fullname && (
              <span className="mt-1 text-xs text-error">
                {errors.fullname.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs font-bold uppercase tracking-widest text-primary">
                Email
              </span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="ban@email.com"
              {...register("email")}
            />
            {errors.email && (
              <span className="mt-1 text-xs text-error">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs font-bold uppercase tracking-widest text-primary">
              Loại yêu cầu
            </span>
          </label>
          <div className="flex flex-wrap gap-3 pt-1">
            {inquiryTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setInquiryType(type)}
                className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  inquiryType === type
                    ? "bg-primary text-primary-content"
                    : "bg-base-300 text-base-content/60 hover:bg-base-content/10"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs font-bold uppercase tracking-widest text-primary">
              Nội dung
            </span>
          </label>
          <textarea
            rows={5}
            className="textarea textarea-bordered w-full"
            placeholder="Chia sẻ mục tiêu của bạn..."
            {...register("message")}
          />
          {errors.message && (
            <span className="mt-1 text-xs text-error">
              {errors.message.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={submitMutation.isPending}
          className="btn btn-primary font-display w-full text-lg font-black uppercase tracking-tight"
        >
          {submitMutation.isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Gửi yêu cầu"
          )}
        </button>
      </form>
    </section>
  );
}
