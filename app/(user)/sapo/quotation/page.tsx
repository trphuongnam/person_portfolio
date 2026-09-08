"use client";
import { useState, useEffect } from "react";
import { Row, Dropdown, Space, Image, Button } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, FormOutlined } from '@ant-design/icons';
import { supabase } from "@/app/lib/supabaseClient";
import DataEmpty from "@/app/components/layout/dataEmpty";
import { useRouter } from "next/navigation";
import { SAPOPAGEURL } from "@/app/common/util/constants";

interface DropdownItemSelected {
    key: string,
    label: string,
    image: string
}

const PriceList = () => {
  const [dropdownData, setDropDownData] = useState<MenuProps['items']>([])
  const [selected, setSelected] = useState<DropdownItemSelected | null>(null)
  const router = useRouter()


  useEffect(() => {
    getPrices()
  }, [])

  const getPrices = async () => {
    const { data, error } = await supabase.from('posts').select().eq('category_id', '063bd274-505e-4398-8c7c-beb257af2601').eq('status', 1)
    if (error) {
      console.error(error)
      return
    }

    const items: MenuProps['items'] = data.map((item) => {
        return {
            key: item.id,
            label: item.title,
            image: item.image_url
        }
    })

    setDropDownData(items)
  }

  const onChangeProduct = (item: any) => {
    const { itemData } = item
    setSelected(itemData)
  }

  const onSwithPage = () => {
    router.push(SAPOPAGEURL.createQuotation)
  }

  return (
    <div className="w-full">
      <section
        className="main-content"
      >
        <Row
          gutter={[48, 32]}
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
            <div className="prices-filter">
                <div>
                    <span>Gói sản phẩm: </span>
                    <Dropdown
                        menu={{
                            items: dropdownData,
                            onClick: (info) => onChangeProduct(info),
                        }}
                        trigger={['click']}
                    >
                        <a className="dropdown" onClick={(e) => e.preventDefault()}>
                            <Space>
                                {selected ? selected.label : 'Chọn gói sản phẩm'}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Button type="primary" icon={<FormOutlined />} size="large" onClick={onSwithPage}>Tạo báo giá</Button>
            </div>
            <div>
                {
                    !selected ? (
                        <>
                            <DataEmpty/>
                        </>
                    ) : (
                        <>
                            <p>Bảng Báo Giá Chi Tiết</p>
                            <Image src={selected.image}/>
                        </>
                    )
                }
                <p></p>
            </div>
        </Row>
      </section>
    </div>
  );
};

export default PriceList;
