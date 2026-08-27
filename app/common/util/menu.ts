import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
export const menus: MenuProps['items'] = [
  {
    label: 'PROFILE',
    key: 'profile',
    icon: '',
    disabled: false
  },
  {
    label: 'EXPERIENCES',
    key: 'experiences',
    icon: '',
    disabled: false
  },
  {
    label: 'CONTACT',
    key: 'contact',
    icon: '',
    disabled: false
  },
  {
    label: 'CONNECT ME',
    key: 'connect',
    icon: '',
    disabled: false
  }
];

export const sapoMenus: MenuProps['items'] = [
  {
    label: 'Trang chủ',
    key: 'top',
    icon: '',
    disabled: false
  },
  {
    label: 'Báo giá',
    key: 'priceList',
    icon: '',
    disabled: false
  },
  {
    label: 'Bài viết',
    key: 'blog',
    icon: '',
    disabled: false
  },
  {
    label: 'Liên hệ',
    key: 'contact',
    icon: '',
    disabled: false
  },
];


export const adminMenus: MenuItem[] = [
  {
    key: 'dashboard',
    icon: '', 
    label: 'Dashboard'
  },
  {
    key: 'email',
    icon: '',
    label: 'Thư đến'
  },
  {
    key: 'users',
    icon: '',
    label: 'Người dùng',
    children: [
      { key: 'listUser', label: 'Danh sách người dùng' },
      { key: 'createUser', label: 'Tạo người dùng' },
      { key: 'updateUser', label: 'Chỉnh sửa người dùng' },
    ],
  },
  {
    key: 'config',
    icon: '',
    label: 'Cấu hình'
  },
]