"use client"
import { Col, Row, Menu, Button } from 'antd';
import type { MenuProps } from 'antd';
import { adminMenus } from '@/app/common/util/menu'
import { ADMINPAGEURL } from '@/app/common/util/constants';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import { ItemType } from 'antd/es/menu/interface';

interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
}

const AdminNavBar = () => {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const [stateOpenKeys, setStateOpenKeys] = useState([]);
    const [current, setCurrent] = useState('mail' as string);

	const onClick: MenuProps['onClick'] = (e) => {
		handleAction(e);
	};
	
	const handleAction = (e: any) => {
		router.push(ADMINPAGEURL[e.key]);
		setCurrent(e.key);
	}

	return (
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={adminMenus}
          onClick={onClick}
          selectedKeys={[current]}
        />
    );
};

export default AdminNavBar;
