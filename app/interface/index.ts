import { JSX } from "react"

export interface TimeLineItemInterface {
    title?: string,
    type?: string,
    content: JSX.Element | string,
    txtContent?: string,
    details?: TimeLineItemDetail,
    color?: string,
    icon?: JSX.Element | string
}

export interface TimeLineItemDetail {
    role: string,
    teamSize: string,
    descriptions: string,
    responsibility: string[],
    technology: string
}