import {
    Layout,
    Row,
    Col,
    Space,
    Divider,
    Typography
} from "antd";
import {
    FacebookOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    InstagramOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;
const { Footer } = Layout;


const SapoFooter = () => {
    return (
        <Footer style={{ background: "#001529", padding: "60px 40px 24px" }}>
            <Row gutter={[32, 32]} style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Col xs={24} md={8}>
                    <Title level={4} style={{ color: "#fff" }}>
                    Nam Sapo
                    </Title>
                    <Paragraph style={{ color: "rgba(255,255,255,0.65)" }}>
                        Đồng hành cùng chủ shop trên hành trình chuyển đổi số và phát
                        triển bền vững.
                    </Paragraph>
                    <Space size="middle">
                        <FacebookOutlined style={{ color: "#fff", fontSize: 18 }} />
                        <TwitterOutlined style={{ color: "#fff", fontSize: 18 }} />
                        <LinkedinOutlined style={{ color: "#fff", fontSize: 18 }} />
                        <InstagramOutlined style={{ color: "#fff", fontSize: 18 }} />
                    </Space>
                </Col>

                <Col xs={24} md={8}>
                    <Title level={5} style={{ color: "#fff" }}>
                    Liên kết nhanh
                    </Title>
                    <Space orientation="vertical">
                    <Link href="/" style={{ color: "rgba(255,255,255,0.65)" }}>
                        Trang chủ
                    </Link>
                    <Link href="/about" style={{ color: "rgba(255,255,255,0.65)" }}>
                        Giới thiệu
                    </Link>
                    <Link href="/blog" style={{ color: "rgba(255,255,255,0.65)" }}>
                        Bài viết
                    </Link>
                    <Link href="/contact" style={{ color: "rgba(255,255,255,0.65)" }}>
                        Liên hệ
                    </Link>
                    </Space>
                </Col>

                <Col xs={24} md={8}>
                    <Title level={5} style={{ color: "#fff" }}>
                    Thông tin liên hệ
                    </Title>
                    <Space orientation="vertical">
                    <Space style={{ color: "rgba(255,255,255,0.65)" }}>
                        <EnvironmentOutlined /> 24 Đường Cách Mạng Tháng 8, Phường Cẩm Lệ, TP.Đà Nẵng
                    </Space>
                    <Space style={{ color: "rgba(255,255,255,0.65)" }}>
                        <PhoneOutlined /> 035 815 0744
                    </Space>
                    <Space style={{ color: "rgba(255,255,255,0.65)" }}>
                        <MailOutlined /> phuongnamgroupers@gmail.com
                    </Space>
                    </Space>
                </Col>
            </Row>

            <Divider style={{ borderColor: "rgba(255,255,255,0.15)", margin: "32px 0 16px" }} />

            <Text style={{ color: "rgba(255,255,255,0.45)", display: "block", textAlign: "center" }}>
            © {new Date().getFullYear()} Nam Sapo. Bảo lưu mọi quyền.
            </Text>
        </Footer>
    )
}

export default SapoFooter