"use client";
import { Layout } from "antd";
import NavBar from "./navBar";
import NavBarMobile from "./navBarMobile";

const BaseLayout = ({
  childComponent,
}: Readonly<{
  childComponent: React.ReactNode;
}>) => {
  const { Content } = Layout;
  return (
    <div className="wrapper">
      <div className="hidden md:block">
        <NavBar/>
      </div>
      <div className="block md:hidden">
        <NavBarMobile />
      </div>
      
      <Content className="flex flex-row gap-5 main-contents">
        {childComponent}
      </Content>
    </div>
  )
}

export default BaseLayout;