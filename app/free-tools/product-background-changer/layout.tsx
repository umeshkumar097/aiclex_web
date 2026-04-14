import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Product Background Changer | Free E-commerce Photo Tool | AICLEX™",
  description: "Transform your product photos instantly with our Free AI Background Changer. Create professional, studio-quality e-commerce images in seconds without any design skills.",
  keywords: ["AI Product Background Changer", "E-commerce Photo Editor", "Free Product Photography Tool India", "AI Studio Backgrounds", "AICLEX AI Tools"],
  openGraph: {
    title: "AI Product Background Changer | AICLEX™ Technologies",
    description: "Upload a photo and let our AI generate the perfect studio background for your product.",
    url: "https://www.aiclex.in/free-tools/product-background-changer",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
