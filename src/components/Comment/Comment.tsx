import React, { FC } from "react"

import { TTask } from "@/types/TTask"

import { UserOutlined } from "@ant-design/icons"
import { Avatar } from "antd"

import dayjs from "dayjs";
import 'dayjs/locale/ru'; 
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

type CommentType = NonNullable<TTask["lifetimeItems"]>[number];

interface Props {
    data: CommentType
}

const headerStyles: React.CSSProperties = {
    display: "flex",
    gap: 15,
    alignItems: "center",
    marginBottom: 10,
}

const userInfoStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 5,
}

const commentStyles: React.CSSProperties = {
    padding: 10,
    marginTop: 0,
    backgroundColor: '#E3E9F4',
    borderRadius: 5,
}

const dateTextStyles: React.CSSProperties = {
    color: '#63677B',
    fontSize: 12
}

export const Comment:FC<Props> = ({data}) => {
    const commentDate = dayjs(data.createdAt).locale('ru').format('DD MMMM, HH:MM');
 
    if(data.comment) {
        return (
            <div>
                <header style={headerStyles}>
                    <Avatar size={36} icon={<UserOutlined />} />
                    <div style={userInfoStyles}>
                        <span>{data.userName}</span>
                        <span style={dateTextStyles}>{commentDate} прокомментировал</span>
                    </div>
                </header>
                
                <div style={commentStyles} dangerouslySetInnerHTML={{__html: data.comment}} />
            </div>
         )
    }
}