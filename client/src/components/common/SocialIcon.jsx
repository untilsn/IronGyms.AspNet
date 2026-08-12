import { Mail } from "lucide-react";
import {
  SiInstagram,
  SiFacebook,
  SiTiktok,
  SiZalo,
} from "@icons-pack/react-simple-icons";

const ICONS = {
  instagram: SiInstagram,
  facebook: SiFacebook,
  tiktok: SiTiktok,
  zalo: SiZalo,
  mail: Mail, // Mail là icon chung (không phải logo thương hiệu), vẫn có sẵn trong lucide-react
};

export default function SocialIcon({ type, size = 18, ...props }) {
  const Icon = ICONS[type] ?? Mail;
  return <Icon size={size} {...props} />;
}
