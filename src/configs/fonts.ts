import { Lora, Inter } from "next/font/google";

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-Lora",
});

const inter = Inter({ subsets: ["latin"] });

export { lora, inter };
