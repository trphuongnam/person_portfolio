"use client";
import { useEffect, useState } from "react";
import { Table } from "antd";
import { supabase } from "@/app/lib/supabaseClient";
import { Tag } from "antd";

export default function AdminContactPage() {
  const [dataSource, setDataSource] = useState([]) as any;
  useEffect(() => {
    getContacts()
  })

  async function getContacts() {
    const { data, error } = await supabase.from('contacts').select()
    if (error) {
      console.error(error)
      return
    }
    setDataSource(data)
  }
  
  const columns = [
    {
      title: 'Tên người gửi',
      dataIndex: 'full_name',
      key: 'full_name',
      width: 200
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
        width: 500,
        render: (_: any, { subject, content }: any) => {
          return (
            <>
              <p><b>Tiêu đề: </b><i>{subject}</i></p>
              <p>
                <b>Nội dung: </b><br></br>
                <i>{content}</i>
              </p>
            </>
          )
        }
    },
    {
      title: 'Nơi gửi',
      dataIndex: 'send_from',
      key: 'send_from',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, { status }: any) => {
        const colors: any = {'new': 'red'}
        const key: string = status.toLowerCase() as string
        return (
          <Tag color={colors[key]}>
            {status.toUpperCase()}
          </Tag>
        )
      }
    }
  ];

  return (
    <div className="w-full">
        <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}
