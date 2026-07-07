'use client'
import { Modal, Empty } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { ModalProps, ModalRef } from '../interface/modalInterface';
import { useTranslation } from "react-i18next";

const CustomModal = forwardRef<ModalRef, ModalProps>((props: ModalProps, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const content = props.content
    const title = props.title
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
        onOpenDialog() {
            setIsModalOpen(true);
        },
    }));
    
    const getRespons = (responsibility: string[]) => {
        const list = responsibility.map(item => <li>{item}</li>)
        return <ul>{list}</ul>;
    }

    const getContent = () => {
        if (!content) {
            return (
                <><Empty/></>
            );
        }

        if (typeof content == 'string') {
            return content;
        }

        const role = content.role
        const teamSize = content.teamSize
        const descriptions = content.descriptions
        const responsibility = content.responsibility
        const technology = content.technology

        return (
            <>
                <span className='label'>{t('page.experience.role')}</span> {role} <br></br>
                <span className='label'>{t('page.experience.teamSize')}</span> {teamSize} <br></br>
                <span className='label'>{t('page.experience.descriptions')}</span> {descriptions} <br></br>
                <span className='label'>{t('page.experience.responsibilities')} </span><br></br> {getRespons(responsibility)}
                <span className='label'>{t('page.experience.technology')} </span>{technology}
            </>
        );
    }

    return (
        <Modal
            title={title != '' ? title : 'Title Modal'}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
        >
            { getContent() }
        </Modal>
    )
});

export default CustomModal