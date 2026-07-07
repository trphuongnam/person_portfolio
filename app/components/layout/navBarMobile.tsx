import { Col, Row, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import { menus } from "@/app/common/util/menu";
import { PAGEURL } from "@/app/common/util/constants";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import { ItemType } from 'antd/es/menu/interface';

const NavBarMobile = () => {
  const { t, i18n } = useTranslation();

  const [current, setCurrent] = useState("profile" as string);
  const [eventMenu, setEventMenu] = useState({} as any);
  const [collapsed, setCollapsed] = useState(false);
  const [currentLang, setCurrentLang] = useState('vi' as string);
	const [appMenu, setAppMenu] = useState<any>([])
  const router = useRouter();

  useEffect(() => {
    setCollapsed(false);
  }, [eventMenu])

  useEffect(() => {
		const transMenus = menus?.map((item: ItemType ) => (
			{
				...item,
				label: t(t(`common.${String(item?.key)}`))
			} 
		))
		setAppMenu(transMenus)
	}, [currentLang])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setEventMenu(e);
    handleAction(e);
  };

  const handleAction = (e: any) => {
    router.push(PAGEURL[e.key]);
    setCurrent(e.key);
  };

  const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
		setCurrentLang(lang);
	};

  const menuModal = () => {
    return (
      <>
        <Menu
          defaultSelectedKeys={[current]}
          mode="inline"
          theme="dark"
          items={appMenu}
          onClick={onClick}
          className={`${collapsed ? "open" : ""}`}
        />
      </>
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
                <Button onClick={() => changeLanguage(currentLang == "vi" ? "en" : "vi")}>
                  {currentLang == "vi" ? "EN" : "VI"}
                </Button>
                <Button
                  type="primary"
                  onClick={toggleCollapsed}
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
