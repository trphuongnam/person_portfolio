import { Col, Row, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import { menus } from "@/app/common/util/menu";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const NavBarMobile = () => {
  const [current, setCurrent] = useState("/" as string);
  const [eventMenu, setEventMenu] = useState({} as any);
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(false);
  }, [eventMenu])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setEventMenu(e);
    handleAction(e);
  };

  const handleAction = (e: any) => {
    router.push(e.key);
    setCurrent(e.key);
  };

  const menuModal = () => {
    return (
        <Menu
            defaultSelectedKeys={[current]}
            mode="inline"
            theme="dark"
            items={menus}
            onClick={onClick}
            className={`${collapsed ? "open" : ""}`}
        />
    );
  };

  return (
    <div className="nav-bar-mobile">
      <Row justify="center" className="nav-bar-mobile__row">
        <Col span={12} className="nav-bar-mobile__col">
          <h2 className="text-logo">NTP</h2>
        </Col>
        <Col span={12} className="nav-bar-mobile__col">
            <div className="nav-bar-mobile__menu">
                <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{ marginBottom: 16 }}
                >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                { menuModal() }
            </div>
        </Col>
      </Row>
    </div>
  );
};

export default NavBarMobile;
