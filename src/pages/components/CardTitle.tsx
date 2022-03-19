import React from 'react';
import { Row, Col } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

function CardTitle({ left, mid }: { left: string; mid: string }) {
  return (
    <Row gutter={16} style={{justifyContent: 'space-between'}}>
      <Col>{left}</Col>
      <Col>{mid}</Col>
      <Col>
        <ExclamationCircleOutlined style={{ color: '#b5b5b5' }} />
      </Col>
    </Row>
  );
}

export default CardTitle;
