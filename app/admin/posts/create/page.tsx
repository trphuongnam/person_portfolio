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
  Dropdown
} from "antd";
import {
  ArrowLeftOutlined,
  SaveOutlined,
  UploadOutlined,
  DownOutlined,
} from "@ant-design/icons";
import type { MenuProps } from 'antd';
import {getCategories} from "@/app/queries/categories"
import {uploadImage} from "@/app/queries/files"
import {createPosts} from "@/app/queries/posts"
import { useEffect, useState } from "react";
import { notify } from "@/app/common/util/notification";
import { useRouter } from "next/navigation";
import { ADMINPAGEURL } from "@/app/common/util/constants";


const { TextArea } = Input;
const { Title, Text } = Typography;

interface DropdownItemSelected {
    key: string,
    label: string,
    value: string
}

export default function CreatePostPage() {
    const [form] = Form.useForm();
    const [dropdownData, setDropDownData] = useState<MenuProps['items']>([])
    const [categorySelected, setCategorySelected] = useState<DropdownItemSelected | null>(null)
    const [loadings, setLoadings] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        onGetCategories()
    }, [])

    async function onGetCategories() {
        const { success, data, error } = await getCategories()
        if (!success) {
            console.error(error)
            return
        }

        const items: MenuProps['items'] = data.map((item) => {
            return {
                key: item.id,
                label: item.name,
                value: item.id
            }
        })
        setDropDownData(items)
    }

    const onChangeCategory = (info: any) => {
        setCategorySelected(info.itemData)
    }

    const onSave = async () => {
        setLoadings(true)
        const image = form.getFieldValue('image')
        const now = new Date();

        const {success: imageSuccess, data: imageData, error: imageError} = await uploadImage(image)
        if (imageSuccess) {
            const postData = {
                title: form.getFieldValue('title'),
                description: form.getFieldValue('description'),
                content: form.getFieldValue('content'),
                location_display: form.getFieldValue('locationDisplay'),
                status: form.getFieldValue('status'),
                image_url: imageData.url ? imageData.url : '',
                category_id: categorySelected ? categorySelected.key : '',
                created_at: now.toISOString(),
                updated_at: now.toISOString(),
            }
            const {success: portSuccess, data: postResult, error: postError} = await createPosts(postData)
            
            if (portSuccess) {
              notify.success('Thành công', 'Lưu bài viết thành công')
              setLoadings(false)
              router.push(ADMINPAGEURL.listPost);
            } else {
              notify.error('Lỗi', 'Lưu bài viết không thành công')
              setLoadings(false)
            }
        } else {
          notify.error('Lỗi', 'Upload ảnh không thành công')
          setLoadings(false)
        }

    }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Title level={3} style={{ margin: 0 }}>
            Tạo bài viết
          </Title>

          <Text type="secondary">
            Tạo nội dung bài viết mới
          </Text>
        </div>

        <Space>
          <Button icon={<ArrowLeftOutlined />}>
            Quay lại
          </Button>

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

      <Form
        form={form}
        layout="vertical"
      >
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
              <Form.Item
                label="Mô tả"
                name="description"
              >
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
              <Form.Item
                label="Hình ảnh"
                name="image"
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>
                      Chọn ảnh
                    </div>
                  </div>
                </Upload>
              </Form.Item>
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
                <Dropdown
                        menu={{
                            items: dropdownData,
                            onClick: (info: any) => {onChangeCategory(info)},
                        }}
                        trigger={['click']}
                    >
                        <a className="dropdown" onClick={(e) => e.preventDefault()}>
                            <Space>
                                {categorySelected ? categorySelected.label : 'Chọn danh mục'}
                                <DownOutlined />
                            </Space>
                        </a>
                </Dropdown>
              </Form.Item>

              {/* Trạng thái */}
              <Form.Item
                label="Trạng thái"
                name="status"
                initialValue={1}
              >
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
