"use client";
import { useEffect, useState } from "react";
import { Table, Switch, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getPosts, updatePosts } from "@/app/queries/posts";
import { useRouter } from "next/navigation";
import { ADMINPAGEURL } from "@/app/common/util/constants";
import { notify } from "@/app/common/util/notification";

export default function AdminPostPage() {
  const router = useRouter();
  const [dataSource, setDataSource] = useState([]) as any;
  useEffect(() => {
    onGetPosts();
  }, []);

  async function onGetPosts() {
    const { success, data, error } = await getPosts();
    if (!success) {
      notify.error("Lỗi", String(error));
      return;
    }
    setDataSource(data);
  }

  const onChangeStatus = (checked: boolean, postId: string, status: number) => {
    handleUpdate(postId, checked ? 1 : 2);
    notify.success(
      "Thành công",
      `${checked ? "Hiện" : "Ẩn"} bài viết thành công`
    );
  };
  const handleUpdate = async (postId: string, pStatus: number) => {
    const { error } = await updatePosts(postId, {
      status: pStatus,
    });

    if (error) {
      notify.error("Lỗi", String(error));
      return;
    }
    onGetPosts();
  };

  const onEdit = (pId: string) => {
    router.push(ADMINPAGEURL.editPost.replace("[uid]", pId));
  };

  const onDelete = (pId: string) => {
    handleUpdate(pId, 3);
    notify.success("Thành công", "Xóa bài viết thành công");
  };

  const columns = [
    {
      title: "Tên bài viết",
      dataIndex: "title",
      key: "title",
      width: 200,
      render: (_: any, { title }: any) => {
        return (
          <p className="text-ellipsis">{title}</p>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (_: any, { description }: any) => {
        return (
          <p className="text-ellipsis">{description}</p>
        );
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      width: 350,
      render: (_: any, { content }: any) => {
        return (
          <p className="text-ellipsis">{content}</p>
        );
      },
    },
    {
      title: "Vị trí hiển thị",
      dataIndex: "location_display",
      key: "location_display",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (_: any, { id, status }: any) => {
        return (
          <Switch
            defaultChecked={status == 1 ? true : false}
            onChange={(checked: boolean) => onChangeStatus(checked, id, status)}
          />
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      width: 200,
      render: (_: any, { id }: any) => {
        return (
          <>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onEdit(id)}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => onDelete(id)}
              danger
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}
