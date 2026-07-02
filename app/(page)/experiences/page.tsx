"use client";
import { Timeline } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

const Experiences = () => {
    const timeLineData = [
        {
            title: 'Jul 2021 — Present',
            content: 'Software Developer, Rikai Technology Co., Ltd, Da Nang',
            color: 'red',
        },
        {
            content: 'Eccube E-commerce System',
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />,
        },
        {
            content: 'Flyer Manager System',
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />,
        },
        {
            content: 'LMS Compass School',
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />,
        },
        {
            content: 'EC-PhotoAlbum',
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />,
        },
        {
            content: 'Football Field Booking',
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />,
        },
        {
            content: 'Search Solution',
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />,
        },
        {
            content: 'Sanyu - Kanbe',
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />,
        },
        {
            title: 'Jul 2020 — May 2021',
            content: 'Software Developer, Khiet Long Joint Stock Corporation, Da Nang',
            color: 'red',
        },
        {
            content: 'Enterprise Operating System',
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />,
        },
        {
            content: 'Dananggas',
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />,
        },
        {
            content: 'EEScons',
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />,
        },
        {
            content: 'DanavtcSurvey',
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />,
        },
    ];

    return (
        <div className="w-full min-h-screen bg-white pt-6 container">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[0.25em] text-neutral-900 page-title">
                EXPERIENCES
            </h1>
            <Timeline
                mode="start"
                items={timeLineData}
            />
        </div>
    )
}

export default Experiences