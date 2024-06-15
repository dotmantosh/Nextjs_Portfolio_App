import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import AppLayout from "./Components/Layout/AppLayout"
import AuthProvider from "@/context/Provider";
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "My Portfolio Website",
  description: "Store your works, Show your skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
