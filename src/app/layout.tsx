import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import ClientOnly from "@/components/ClientOnly";
import Model from "@/components/Models/Model";
import RegisterModel from "@/components/Models/RegisterModel";
import ToastProvider from "@/components/ToastProvider";
import LoginModel from "@/components/Models/LoginModel";
import { getCurrentUser } from "@/action/getCurrentUser";
import { redirect } from "next/navigation";
import RentModel from "@/components/Models/RentModel";
import SearchModel from "@/components/Models/SearchModel";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser()
  console.log(user)
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly >
          <SearchModel/>
          <RentModel/>
          <RegisterModel/>
          <LoginModel/>
          <ToastProvider/>
          <Navbar CurrentUser = {user}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
        {children}
        </div>
      </body>
    </html>
  );
}
