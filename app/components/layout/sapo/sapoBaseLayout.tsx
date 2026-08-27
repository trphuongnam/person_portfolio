"use client";
import { Layout } from "antd";
import SapoHeader from "./sapoHeader";
import SapoFooter from "./sapoFooter";

const SapoBaseLayout = ({
  childComponent,
}: Readonly<{
  childComponent: React.ReactNode;
}>) => {
  const { Content } = Layout;

  return (
    <Layout className="min-h-screen">
      {/* ---------------- HEADER ---------------- */}
      <SapoHeader/>

      {/* ---------------- CONTENT ---------------- */}
      <Content>
        {childComponent}
      </Content>

      {/* ---------------- FOOTER ---------------- */}
      <SapoFooter/>
    </Layout>
  ) 
}

export default SapoBaseLayout;