"use client";
import { useState, useRef } from 'react';
import { Timeline, TimelineProps, Button } from 'antd';
import { CodeOutlined, BankOutlined } from '@ant-design/icons';
import { EXPERIENCES } from '@/app/mockData/experiences';
import { TimeLineItemInterface, TimeLineItemDetail } from '@/app/interface';
import CustomModal from '@/app/common/modal';
import { ModalRef } from '@/app/interface/modalInterface';

const Experiences = () => {
    const modalRef = useRef<ModalRef>(null);
    const [modalTiltle, setModalTitle] = useState<string>('')
    const [modalBody, setModalBody] = useState<TimeLineItemDetail | undefined>(undefined)

    const handleClickTitleTimeline = (item: TimeLineItemInterface) => {
        if (item.txtContent) {
            setModalTitle(item.txtContent)
            setModalBody(item.details)
            modalRef.current?.onOpenDialog()
        }
    }

    const timeLineDatas = EXPERIENCES.map((item) => {
        const data: TimeLineItemInterface =  {
            content: <Button className='main-color' type="link" onClick={() => handleClickTitleTimeline(item as TimeLineItemInterface)}>{item.txtContent}</Button>,
            color: 'green',
            icon: <CodeOutlined style={{ fontSize: '16px' }} />
        };
        if (item.type == 'company') {
            data.content = <span>{item.txtContent}</span>;
            data.title = item.title;
            data.color = 'red';
            data.icon = <BankOutlined style={{ fontSize: '16px' }} />;
        }
        return data;
    })

    const styles: TimelineProps['styles'] = {
        itemIcon: {
          borderColor: '#1890ff',
        },
    };

    return (
        <div className="w-full min-h-screen bg-white pt-6 container">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[0.25em] text-neutral-900 page-title">
                EXPERIENCES
            </h1>
            <Timeline
                mode="start"
                items={timeLineDatas}
                styles={styles}
            />
            <CustomModal
                ref={modalRef}
                title={modalTiltle}
                content={modalBody}
            />
        </div>
    )
}

export default Experiences