"use client";
import { useState, useRef, useEffect } from 'react';
import { Timeline, TimelineProps, Button } from 'antd';
import { CodeOutlined, BankOutlined } from '@ant-design/icons';
import { EXPERIENCES_EN, EXPERIENCES_VN } from '@/app/mockData/experiences';
import { TimeLineItemInterface, TimeLineItemDetail } from '@/app/interface';
import CustomModal from '@/app/common/modal';
import { ModalRef } from '@/app/interface/modalInterface';
import { useTranslation } from "react-i18next";

const Experiences = () => {
    const modalRef = useRef<ModalRef>(null);
    const [modalTiltle, setModalTitle] = useState<string>('')
    const [modalBody, setModalBody] = useState<TimeLineItemDetail | undefined>(undefined)
    const [experiences, setExperiences] = useState<any>([])
    const { t, i18n } = useTranslation();

    const handleClickTitleTimeline = (item: TimeLineItemInterface) => {
        if (item.txtContent) {
            setModalTitle(item.txtContent)
            setModalBody(item.details)
            modalRef.current?.onOpenDialog()
        }
    }

    useEffect(() => {
        if (i18n.language == 'vi') {
            setExperiences(EXPERIENCES_VN)
        } else {
            setExperiences(EXPERIENCES_EN)
        }
    })

    const timeLineDatas = experiences.map((item: any) => {
        const data: TimeLineItemInterface =  {
            content: <Button className='main-color button-wrap' type="link" onClick={() => handleClickTitleTimeline(item as TimeLineItemInterface)}>{item.txtContent}</Button>,
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
                {t('common.experiences')}
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