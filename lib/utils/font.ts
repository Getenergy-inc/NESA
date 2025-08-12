import localFont from "next/font/local";
import { Poppins } from "next/font/google";

export const poppins = Poppins({ weight: ["100", "300", "500", "800", "900"], subsets: ["latin"] });

export const raleway = localFont({
  src: "../../assets/fonts/Raleway-VariableFont_wght.ttf",
  display: "swap",
});

export const inter = localFont({
  src: "../../assets/fonts/Inter-VariableFont.ttf",
  display: "swap",
});

export const manrope = localFont({
  src: "../../assets/fonts/Manrope-VariableFont_wght.ttf",
  display: "swap",
});

export const montserrat = localFont({
  src: "../../assets/fonts/Montserrat-VariableFont_wght.ttf",
  display: "swap",
});
