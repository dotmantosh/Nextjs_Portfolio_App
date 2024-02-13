import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";
import { Layout } from "antd";
import AppLayout from "./Components/Layout/AppLayout"
const {Header, Content, Footer} = Layout
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
        <AntdRegistry>
          <AppLayout>          
            {children}  
          </AppLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
