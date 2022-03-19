import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Tag, Space, Statistic, Pagination } from 'antd';
import { Line } from '@ant-design/plots';

const { CheckableTag } = Tag;

const columns = [
  {
    title: '',
    dataIndex: 'id',
    key: 'id',
    render: (text: number) => (
      <Row
        justify="center"
        style={
          text <= 3
            ? {
              backgroundColor: '#304558',
              color: '#fff',
              width: '20px',
              borderRadius: '50%',
            }
            : {
              color: '#000',
              backgroundColor: '#eee',
              width: '20px',
              borderRadius: '50%',
            }
        }
      >
        {text}
      </Row>
    ),
    width: 30,
  },
  {
    title: '门店名称',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <div style={{ color: '#787878', fontSize: 20 }}>{text}</div>
    ),
  },
  {
    title: '销售额',
    dataIndex: 'turnover',
    key: 'turnover',
    sorter: (a: any, b: any) => a.turnover - b.turnover,
    render: (text: number) => (
      <Statistic value={text} valueStyle={{ fontSize: 16, color: '#787878' }} />
    ),
  },
  {
    title: '订单量',
    dataIndex: 'indent',
    key: 'indent',
    sorter: (a: any, b: any) => a.indent - b.indent,
    render: (text: number) => (
      <Statistic value={text} valueStyle={{ fontSize: 16, color: '#787878' }} />
    ),
  },
];

const data = [
  {
    key: '1',
    id: 1,
    name: 'xxx店',
    turnover: 1234,
    indent: 123457,
  },
  {
    key: '2',
    id: 2,
    name: 'xxx店',
    turnover: 1234,
    indent: 123456,
  },
  {
    key: '3',
    id: 3,
    name: 'xxx店',
    turnover: 1234,
    indent: 123458,
  },
  {
    key: '4',
    id: 4,
    name: 'xxx店',
    turnover: 1234,
    indent: 123453,
  },
  {
    key: '5',
    id: 5,
    name: 'xxx店',
    turnover: 1234,
    indent: 123453,
  },
  {
    key: '6',
    id: 6,
    name: 'xxx店',
    turnover: 1234,
    indent: 123453,
  },
];

const config = {
  xField: 'month',
  yField: 'value',
  seriesField: 'category',
  yAxis: {
    grid: {
      line: {
        style: {
          lineDash: [8, 5],
        },
      },
    },
  },
  color: ['#30c25b', '#f5323d', '#febf02'],
  legend: {
    position: 'top-right',
    marker: {
      spacing: 8,
    },
    items: [
      {
        name: '分类 1',
        marker: {
          style: { r: 4, fill: '#30c25b' },
          symbol: 'square',
        },
      },
      {
        name: '分类 2',
        marker: {
          style: { r: 4, fill: '#f5323d' },
          symbol: 'square',
        },
      },
      {
        name: '分类 3',
        marker: {
          style: { r: 4, fill: '#febf02' },
          symbol: 'square',
        },
      },
    ],
  },
  data: [
    { month: '一月', category: '分类 1', value: 677 },
    { month: '一月', category: '分类 2', value: 590 },
    { month: '一月', category: '分类 3', value: 611 },
    { month: '二月', category: '分类 1', value: 122 },
    { month: '二月', category: '分类 2', value: 370 },
    { month: '二月', category: '分类 3', value: 296 },
    { month: '三月', category: '分类 1', value: 626 },
    { month: '三月', category: '分类 2', value: 462 },
    { month: '三月', category: '分类 3', value: 111 },
    { month: '四月', category: '分类 1', value: 111 },
    { month: '四月', category: '分类 2', value: 863 },
    { month: '四月', category: '分类 3', value: 87 },
    { month: '五月', category: '分类 1', value: 642 },
    { month: '五月', category: '分类 2', value: 850 },
    { month: '五月', category: '分类 3', value: 125 },
    { month: '六月', category: '分类 1', value: 187 },
    { month: '六月', category: '分类 2', value: 934 },
    { month: '六月', category: '分类 3', value: 708 },
  ],
};

const tagsData = ['销售额', '订单量', '客单价', '消费客户数', '新增客户数'];

function ShopManage() {
  const [selectedTags, setSelectedTag] = useState(['销售额']);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTag(nextSelectedTags);
  };

  // @ts-ignore
  return (
    <div style={{ width: '100%', marginTop: '20px' }}>
      <Row>
        <Col span={6}>
          <Row justify="center">门店经营排行</Row>
          <Row>
            <Table
              style={{ width: '100%' }}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
            <Pagination
              size="small"
              total={50}
              showSizeChanger
              showQuickJumper
              style={{ marginTop: '20px' }}
              defaultPageSize={5}
              pageSizeOptions={[5, 10, 15, 20]}
            />
          </Row>
        </Col>
        <Col span={17} offset={1}>
          <Row justify="center">门店经营总体情况</Row>
          <Row>
            {tagsData.map((tag) => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={(checked) => handleChange(tag, checked)}
                style={{ border: '1px solid #eee', marginRight: 0 }}
              >
                {tag}
              </CheckableTag>
            ))}
          </Row>
          <Row>
            <Line {...config} style={{ width: '100%' }} />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ShopManage;
