"use client";
import { Layout } from "antd";
import NavBar from "./navBar";

const BaseLayout = ({
  childComponent,
}: Readonly<{
  childComponent: React.ReactNode;
}>) => {
  const { Content } = Layout;
  return (
    <>
      <NavBar></NavBar>
      <Content className="flex flex-row gap-5 main-contents">
        {childComponent}
      </Content>
    </>
  )
}

export default BaseLayout;