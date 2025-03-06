import { GeistSans } from "geist/font/sans";
import { Poppins } from "next/font/google";

export const geistSans = GeistSans;
export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
