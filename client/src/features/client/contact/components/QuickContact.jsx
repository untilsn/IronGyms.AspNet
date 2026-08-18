import { Phone, Mail } from "lucide-react";

const contacts = [
  { icon: Phone, label: "Gọi cho chúng tôi", value: "0901 234 567" },
  { icon: Mail, label: "Email cho chúng tôi", value: "hello@irongyms.vn" },
];

export default function QuickContact() {
  return (
    <div className="divider-subtle space-y-6 border-t pt-6">
      {contacts.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-6">
          <div className="bg-base-300 text-primary flex h-12 w-12 items-center justify-center rounded-full">
            <Icon size={20} />
          </div>
          <div>
            <p className="text-base-content/50 text-[10px] font-bold tracking-widest uppercase">
              {label}
            </p>
            <p className="text-base-content text-lg font-bold">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
