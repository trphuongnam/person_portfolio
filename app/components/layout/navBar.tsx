"use client"
import { Col, Row, Menu, Button } from 'antd';
import type { MenuProps } from 'antd';
import { menus } from '@/app/common/util/menu'
import { PAGEURL } from '@/app/common/util/constants';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import { ItemType } from 'antd/es/menu/interface';


const NavBar = () => {
	const { t, i18n } = useTranslation();

	const [current, setCurrent] = useState('mail' as string);
	const [currentLang, setCurrentLang] = useState('vi' as string);
	const [appMenu, setAppMenu] = useState<any>([])
	const router = useRouter();

	useEffect(() => {
		const transMenus = menus?.map((item: ItemType ) => (
			{
				...item,
				label: t(t(`common.${String(item?.key)}`))
			} 
		))
		setAppMenu(transMenus)
	}, [currentLang])

	const onClick: MenuProps['onClick'] = (e) => {
		handleAction(e);
	};
	
	const handleAction = (e: any) => {
		router.push(PAGEURL[e.key]);
		setCurrent(e.key);   
	}

	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
		setCurrentLang(lang);
	};

	return (
			<div className='nav-bar'>
				<Row
					justify="center"
					className='nav-bar__row'
				>
					<Col
						span={4}
						className='nav-bar__col'
					>
						<h2 className='text-logo'>NTP</h2>
					</Col>
					<Col
						span={16}
						className='nav-bar__col'
					>
						<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={appMenu} style={{ flex: 1, minWidth: 0 }}/>
					</Col>
					<Col
						span={4}
						className='nav-bar__col'
					>
						<div className='flex justify-end'>
							<Button onClick={() => changeLanguage(currentLang == "vi" ? "en" : "vi")}>
								{currentLang == "vi" ? "EN" : "VI"}
							</Button>
						</div>
					</Col>
				</Row>
			</div>
		);
	};

export default NavBar;
