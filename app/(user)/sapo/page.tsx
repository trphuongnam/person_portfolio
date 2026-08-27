"use client";

import {
  Button,
  Row,
  Col,
  Typography,
  Card,
  Avatar,
  Rate,
  Carousel,
  Space,
  Tag,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";

const { Title, Paragraph, Text } = Typography;

// ---------------------------------------------
// DỮ LIỆU MẪU - Thay bằng dữ liệu thật (API, CMS...) khi tích hợp
// ---------------------------------------------
const posts = [
  {
    id: 1,
    title: "5 xu hướng công nghệ nổi bật năm 2026",
    excerpt:
      "Cùng điểm qua những xu hướng công nghệ được dự đoán sẽ tạo ra bước ngoặt lớn cho doanh nghiệp trong năm nay.",
    image: "https://picsum.photos/seed/post1/600/400",
    date: "20/08/2026",
    category: "Công nghệ",
  },
  {
    id: 2,
    title: "Bí quyết xây dựng đội ngũ vận hành hiệu quả",
    excerpt:
      "Chia sẻ kinh nghiệm thực tế từ đội ngũ vận hành của chúng tôi trong quá trình mở rộng quy mô công ty.",
    image: "https://picsum.photos/seed/post2/600/400",
    date: "15/08/2026",
    category: "Vận hành",
  },
  {
    id: 3,
    title: "Case study: Tối ưu chi phí vận hành cho khách hàng X",
    excerpt:
      "Chi tiết quá trình đồng hành cùng khách hàng để cắt giảm 30% chi phí vận hành trong vòng 6 tháng.",
    image: "https://picsum.photos/seed/post3/600/400",
    date: "10/08/2026",
    category: "Case Study",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    role: "Giám đốc Marketing, Công ty ABC",
    avatar: "https://i.pravatar.cc/150?img=32",
    content:
      "Đội ngũ rất chuyên nghiệp, phản hồi nhanh chóng và luôn đặt lợi ích của khách hàng lên hàng đầu. Chúng tôi rất hài lòng khi hợp tác.",
    rating: 5,
  },
  {
    id: 2,
    name: "Trần Quốc Bảo",
    role: "CEO, Startup XYZ",
    avatar: "https://i.pravatar.cc/150?img=15",
    content:
      "Giải pháp được triển khai đúng tiến độ, chất lượng vượt mong đợi. Chắc chắn sẽ tiếp tục đồng hành lâu dài.",
    rating: 5,
  },
  {
    id: 3,
    name: "Lê Thị Hồng",
    role: "Trưởng phòng Vận hành, Tập đoàn DEF",
    avatar: "https://i.pravatar.cc/150?img=45",
    content:
      "Dịch vụ hỗ trợ khách hàng rất tận tâm, luôn lắng nghe và điều chỉnh linh hoạt theo nhu cầu thực tế của doanh nghiệp.",
    rating: 4,
  },
];

export default function HomePage() {
  return (
    
    <div>
      {/* ---------------- GIỚI THIỆU ---------------- */}
      <section
        style={{
          background: "linear-gradient(135deg, #e6f4ff 0%, #ffffff 100%)",
          padding: "80px 40px",
        }}
      >
        <Row gutter={[48, 32]} align="middle" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Col xs={24} md={12}>
            <Tag color="blue">Chào mừng đến với chúng tôi</Tag>
            <Title level={1} style={{ marginTop: 16 }}>
              Giải pháp công nghệ giúp doanh nghiệp bạn phát triển bền vững
            </Title>
            <Paragraph type="secondary" style={{ fontSize: 16 }}>
              Chúng tôi đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số,
              mang đến những giải pháp tối ưu, hiệu quả và phù hợp với từng nhu cầu
              riêng biệt của khách hàng.
            </Paragraph>
            <Space size="middle" style={{ marginTop: 16 }}>
              <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                Khám phá dịch vụ
              </Button>
              <Button size="large">Tìm hiểu thêm</Button>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Image
              src="https://hkmhxyatgjtdgecigxot.supabase.co/storage/v1/object/sign/sapo/banner.png?token=eyJraWQiOiJmZmRhMDkyNS03YzVmLTQ2ZDMtYWIxYy1lZjFmZWEyMGNkMWQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzYXBvL2Jhbm5lci5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg3ODQ4MDE4LCJleHAiOjE4MTkzODQwMTh9.lMNEQ_REbm1y3YHBYRnp038snmv51yErtXvjcETLSws"
              alt="Giới thiệu công ty"
              width={800}
              height={600}
              style={{ width: "100%", height: "auto", borderRadius: 16 }}
            />
          </Col>
        </Row>
      </section>

      {/* ---------------- BÀI POST MỚI NHẤT ---------------- */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Tag color="blue">Blog</Tag>
            <Title level={2}>Bài viết mới nhất</Title>
            <Paragraph type="secondary">
              Cập nhật những tin tức, kiến thức và câu chuyện mới nhất từ chúng tôi.
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {posts.map((post) => (
              <Col xs={24} sm={12} md={8} key={post.id}>
                <Card
                  hoverable
                  cover={
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={600}
                      height={400}
                      style={{ width: "100%", height: 220, objectFit: "cover" }}
                    />
                  }
                >
                  <Space orientation="vertical" size={4} style={{ marginBottom: 8 }}>
                    <Space size={8}>
                      <Tag color="geekblue">{post.category}</Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {post.date}
                      </Text>
                    </Space>
                  </Space>
                  <Title level={4} style={{ marginTop: 0 }}>
                    {post.title}
                  </Title>
                  <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                    {post.excerpt}
                  </Paragraph>
                  <Button type="link" style={{ paddingLeft: 0 }}>
                    Đọc thêm <ArrowRightOutlined />
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* ---------------- Ý KIẾN KHÁCH HÀNG ---------------- */}
      <section style={{ padding: "80px 40px", background: "#f5f7fa" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Tag color="blue">Đánh giá</Tag>
          <Title level={2}>Khách hàng nói gì về chúng tôi</Title>
          <Paragraph type="secondary" style={{ marginBottom: 48 }}>
            Sự hài lòng của khách hàng là thước đo thành công của chúng tôi.
          </Paragraph>

          <Carousel autoplay dots={{ className: "custom-dots" }}>
            {testimonials.map((item) => (
              <div key={item.id}>
                <Card
                  style={{
                    border: "none",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    margin: "0 8px",
                  }}
                >
                  <Rate disabled defaultValue={item.rating} style={{ marginBottom: 16 }} />
                  <Paragraph style={{ fontSize: 16, fontStyle: "italic" }}>
                    “{item.content}”
                  </Paragraph>
                  <Space orientation="vertical" align="center" style={{ marginTop: 16 }}>
                    <Avatar src={item.avatar} size={56} />
                    <Text strong>{item.name}</Text>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {item.role}
                    </Text>
                  </Space>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}