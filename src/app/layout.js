import localFont from "next/font/local";
import Image from "next/image";
import styles from "./layout.module.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Koreyik!",
  description: "Қазақ аниме қоры",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kk">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.container}>
          <header className={styles.header}>
            <Image
              className={styles.logo}
              src="/logo.png"
              alt="Koreyik!"
              width={220}
              height={60}
              quality={100}
              priority
            />
            <p className={styles.slogan}>Қазақ аниме қоры</p>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
