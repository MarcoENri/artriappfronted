import React from 'react';
import { PlayCircleFilled } from '@ant-design/icons';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

type CardType = {
    name:string,
    description:string
    link:string
}

const MusicCard:React.FC<CardType> = ({name, description, link}:CardType) => (
    <Card
    style={{width:'90ex', margin:'3ex', backgroundColor:'#6eb8f5'}}
        actions={[
            <Link to={link}><PlayCircleFilled key="play" /></Link>,
            
        ]}
    >
        <Meta 
            title={name}
            description={description}
           
        />
    </Card>
);

export default MusicCard