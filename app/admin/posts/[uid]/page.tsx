"use client";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  Upload,
  Image,
} from "antd";
import {
  ArrowLeftOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getCategories } from "@/app/queries/categories";
import { uploadImage, deleteImage } from "@/app/queries/files";
import { updatePosts, getPostById } from "@/app/queries/posts";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { notify } from "@/app/common/util/notification";

const { TextArea } = Input;
const { Title } = Typography;

interface CategoryInterface {
  label: string;
  value: string;
}

interface PostDataInterface {
  title: string,
  description: string,
  content: string,
  location_display: string,
  status: number,
  image_url?: string,
  category_id: string,
  updated_at: string,
}

export default function UpdatePostPage() {
  const params = useParams();
  const [form] = Form.useForm();
  const [dropdownData, setDropDownData] = useState<CategoryInterface[]>([]);
  const [postImage, setPostImage] = useState<string>('');
  const [loadings, setLoadings] = useState<boolean>(false);

  useEffect(() => {
    onGetPost();
    onGetCategories();
  }, []);
  
  const postId = String(params.uid);

  async function onGetPost() {
    const { success, data, error } = await getPostById(postId);
    if (!success) {
      console.error(error);
      return;
    }
    form.setFieldsValue({
      title: data.title,
      description: data.description,
      content: data.content,
      status: data.status,
      locationDisplay: data.location_display,
      category: data.category_id
    });
    setPostImage(data.image_url)
  }

  async function onGetCategories() {
    const { success, data, error } = await getCategories();
    if (!success) {
      console.error(error);
      return;
    }

    const items: CategoryInterface[] = data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    setDropDownData(items);
  }

  const onSave = async () => {
    setLoadings(true);
    const image = form.getFieldValue("image");
    if (image) {
      const {success: imageSuccess,data: imageData,error: imageError} = await uploadImage(image);
      if (imageSuccess) {
        notify.success("Thành công", "Upload ảnh thành công");
        savePost(imageData);
        const {success: deleteSuccess, error: imageError} = await deleteImage(postImage);
        if (!deleteSuccess) {
          notify.error("Thất bại", imageError);
        }
      } else {
        notify.error("Lỗi", "Lỗi khi upload ảnh");
      }
    } else {
      savePost();
    }
  };

  const savePost = async (imageData?: any) => {
    const now = new Date();
    const postData: PostDataInterface = {
      title: form.getFieldValue("title"),
      description: form.getFieldValue("description"),
      content: form.getFieldValue("content"),
      location_display: form.getFieldValue("locationDisplay"),
      status: form.getFieldValue("status"),
      category_id: form.getFieldValue("category"),
      updated_at: now.toISOString(),
    };

    if (imageData) {
      postData.image_url = imageData.url;
    }

    const {
      success: postSuccess,
      data: postResult,
      error: postError,
    } = await updatePosts(postId, postData);

    if (postSuccess) {
      notify.success("Thành công", "Lưu bài viết thành công");
    } else {
      notify.error("Lỗi", "Lưu bài viết không thành công");
    }
    setLoadings(false)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Title level={3} style={{ margin: 0 }}>
            Chỉnh sửa bài viết
          </Title>
        </div>

        <Space>
          <Button icon={<ArrowLeftOutlined />}>Quay lại</Button>

          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => onSave()}
            loading={loadings}
          >
            Lưu bài viết
          </Button>
        </Space>
      </div>

      <Form form={form} layout="vertical">
        <Row gutter={[24, 24]}>
          {/* =========================
              LEFT
          ========================== */}
          <Col xs={24} lg={17}>
            <Card title="Nội dung bài viết">
              {/* Tiêu đề */}
              <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiêu đề",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Nhập tiêu đề bài viết"
                  showCount
                  maxLength={200}
                />
              </Form.Item>

              {/* Mô tả */}
              <Form.Item label="Mô tả" name="description">
                <TextArea
                  placeholder="Nhập mô tả ngắn cho bài viết"
                  autoSize={{
                    minRows: 3,
                    maxRows: 6,
                  }}
                  showCount
                  maxLength={500}
                />
              </Form.Item>

              {/* Nội dung */}
              <Form.Item
                label="Nội dung"
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nội dung",
                  },
                ]}
              >
                <TextArea
                  placeholder="Nhập nội dung bài viết..."
                  autoSize={{
                    maxRows: 15,
                  }}
                />
              </Form.Item>

              {/* Hình ảnh */}
              <Form.Item label="Hình ảnh" name="image">
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                  </div>
                </Upload>
              </Form.Item>
              {postImage ? (
                <Image src={postImage} width={150}/>
              ) : <></>}
            </Card>
          </Col>

          {/* =========================
              RIGHT
          ========================== */}
          <Col xs={24} lg={7}>
            <Card title="Thông tin bài viết">
              {/* Danh mục */}
              <Form.Item
                label="Danh mục"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn danh mục",
                  },
                ]}
              >
                <Select
                  size="large"
                  options={dropdownData}
                />
              </Form.Item>

              {/* Trạng thái */}
              <Form.Item label="Trạng thái" name="status" initialValue={1}>
                <Select
                  size="large"
                  options={[
                    {
                      label: "Hiển thị",
                      value: 1,
                    },
                    {
                      label: "Ẩn",
                      value: 2,
                    },
                  ]}
                />
              </Form.Item>

              {/* Khu vực hiển thị */}
              <Form.Item
                label="Khu vực hiển thị"
                name="locationDisplay"
                initialValue="Sapo"
              >
                <Select
                  size="large"
                  options={[
                    {
                      label: "Sapo",
                      value: "Sapo",
                    },
                    {
                      label: "Profile",
                      value: "Profile",
                    },
                  ]}
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
