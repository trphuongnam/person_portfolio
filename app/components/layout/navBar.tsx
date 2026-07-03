import { Col, Row, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { menus } from '@/app/common/util/menu'
import { PAGEURL } from '@/app/common/util/constants';
import { useState } from 'react';
import { useRouter } from "next/navigation";


const NavBar = () => {
	const [current, setCurrent] = useState('mail' as string);
	const [eventMenu, setEventMenu] = useState({} as any);
	const router = useRouter();

	const onClick: MenuProps['onClick'] = (e) => {
		setEventMenu(e);
		handleAction(e);
	};
	
	const handleAction = (e: any) => {
		router.push(PAGEURL[e.key]);
		setCurrent(e.key);   
	}
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
					span={20}
					className='nav-bar__col'
				>
					<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menus} style={{ flex: 1, minWidth: 0 }}/>
				</Col>
			</Row>
		</div>
	);
};

export default NavBar;
