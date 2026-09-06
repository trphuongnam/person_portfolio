import { useState } from "react";
import {
    Layout,
    Menu,
    Button,
    Space,
    Grid,
    Drawer,
    Image
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { sapoMenus } from "@/app/common/util/menu";
import { useRouter } from "next/navigation";
import { SAPOPAGEURL } from "@/app/common/util/constants";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const SapoHeader = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [current, setCurrent] = useState('mail' as string);
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const router = useRouter();

    const onChangeMenu = (e: any) => {
        router.push(SAPOPAGEURL[e.key]);
        setCurrent(e.key);
        if (isMobile) {
            setDrawerOpen(false);
        }
    }

    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                position: "sticky",
                top: 0,
                zIndex: 10,
                padding: "0 40px",
            }}
        >
            <Space align="center">
                <Image
                    src='https://hkmhxyatgjtdgecigxot.supabase.co/storage/v1/object/sign/sapo/logo.jpg?token=eyJraWQiOiJmZmRhMDkyNS03YzVmLTQ2ZDMtYWIxYy1lZjFmZWEyMGNkMWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzYXBvL2xvZ28uanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4Nzg0OTIxOSwiZXhwIjoxODE5Mzg1MjE5fQ.pa_Rboxn0rReU42jcEMsxu2Dc78wF2YjsiBphkGndlQ'
                    width={80}
                    preview={false}
                />
            </Space>

            {isMobile ? (
                <Button
                    type="text"
                    icon={<MenuOutlined style={{ fontSize: 20 }} />}
                    onClick={() => setDrawerOpen(true)}
                    aria-label="Mở menu"
                />
            ) : (
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={[current]}
                    style={{ flex: 1, justifyContent: "center", borderBottom: "none" }}
                    items={sapoMenus}
                    onClick={onChangeMenu}
                />
            )}

            <Button type="primary">Liên hệ ngay</Button>

            {/* ---------------- MOBILE MENU DRAWER ---------------- */}
            <Drawer
                title="Nam Sapo"
                placement="right"
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
            >
                <Menu
                    mode="vertical"
                    defaultSelectedKeys={[current]}
                    items={sapoMenus}
                    onClick={(e) => onChangeMenu(e)}
                    style={{ borderInlineEnd: "none" }}
                />
                <Button type="primary" block style={{ marginTop: 24 }}>Liên hệ ngay</Button>
            </Drawer>
        </Header>
    )
}

export default SapoHeader
