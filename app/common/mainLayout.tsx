"use client"
import React from 'react'
import { Geist, Geist_Mono } from "next/font/google";
import BaseLayout from '../components/layout/baseLayout';
import AdminBaseLayout from "@/app/components/layout/admin/adminBaseLayout";
import SapoBaseLayout from "../components/layout/sapo/sapoBaseLayout";
import { ReactNode } from "react";
import { usePathname } from 'next/navigation';

import "@/app/i18n";

export type Props = {
  children: React.ReactNode
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const MainLayout = (props: Props) => {
	const {children} = props
  
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isSapoRoute = pathname.startsWith('/sapo');

  const getLayout = (): ReactNode => {
    if (isAdminRoute) {
      return (
        <AdminBaseLayout childComponent={children} />
      )
    }

    if (isSapoRoute) {
      return (
        <SapoBaseLayout childComponent={children} />
      )
    }
    
    return (
      <BaseLayout childComponent={children} />
    );
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
			<body>
        {getLayout()}
			</body>
    </html>
  );
};

export default MainLayout;
