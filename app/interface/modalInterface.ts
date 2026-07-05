import { TimeLineItemDetail } from "./index"
export interface ModalProps {
    ref?: ModalRef,
    title?: string,
    content?: TimeLineItemDetail | string,
}

export interface ModalRef {
    onOpenDialog: () => void;
}