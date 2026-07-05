'use client'
import { Modal, Empty } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { ModalProps, ModalRef } from '../interface/modalInterface';

const CustomModal = forwardRef<ModalRef, ModalProps>((props: ModalProps, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const content = props.content
    const title = props.title

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
                <span className='label'>Role:</span> {role} | <span className='label'>Team size:</span> {teamSize} <br></br>
                <span className='label'>Descriptions</span>: {descriptions} <br></br>
                <span className='label'>Responsibilities: </span><br></br> {getRespons(responsibility)}
                <span className='label'>Technologies: </span>{technology}
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