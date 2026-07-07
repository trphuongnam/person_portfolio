"use client"
import React from 'react'
import { Geist, Geist_Mono } from "next/font/google";
import BaseLayout from '../components/layout/baseLayout';
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

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
			<body>
      	<BaseLayout childComponent={children}></BaseLayout>
			</body>
    </html>
  );
};

export default MainLayout;
