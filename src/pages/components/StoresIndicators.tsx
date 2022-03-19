import React, { useState } from 'react';
import { Row, Col, Tag, TreeSelect, Card } from 'antd';
import { Line } from '@ant-design/plots';

const { CheckableTag } = Tag;

const tagsData = ['销售额', '订单量', '客单价', '客户数'];

const treeData = [
  {
    title: '全部',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
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
  color: ['#178ffe', '#f5323d'],
  legend: {
    position: 'top-right',
    items: [
      {
        name: '指标环比值',
        marker: {
          style: { r: 4, fill: '#178ffe' },
          symbol: 'square',
        },
      },
    ],
  },
  data: [
    { month: '一月', category: '指标环比值', value: 677 },
    { month: '一月', category: '分类 2', value: 590 },
    { month: '一月', category: '指标环比值', value: 611 },
    { month: '二月', category: '指标环比值', value: 122 },
    { month: '二月', category: '分类 2', value: 370 },
    { month: '二月', category: '指标环比值', value: 296 },
    { month: '三月', category: '指标环比值', value: 626 },
    { month: '三月', category: '分类 2', value: 462 },
    { month: '三月', category: '指标环比值', value: 111 },
    { month: '四月', category: '指标环比值', value: 111 },
    { month: '四月', category: '分类 2', value: 863 },
    { month: '四月', category: '指标环比值', value: 87 },
    { month: '五月', category: '指标环比值', value: 642 },
    { month: '五月', category: '分类 2', value: 850 },
    { month: '五月', category: '指标环比值', value: 125 },
    { month: '六月', category: '指标环比值', value: 187 },
    { month: '六月', category: '分类 2', value: 934 },
    { month: '六月', category: '指标环比值', value: 708 },
  ],
};

const StoresIndicators = () => {

  const [selectedTags, setSelectedTag] = useState(['销售额']);
  const [treeValue, setTreeValue] = useState('0-0');

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTag(nextSelectedTags);
  };

  const treeValueChange = (value: string) => {
    setTreeValue(value);
  };

  return (
    <Card>
      <Row justify="center">门店指标环比数据</Row>
      <Row>
        <Col span={2}>指标选择：</Col>
        <Col>
          {tagsData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => handleChange(tag, checked)}
              style={{
                border: '1px solid #eee',
                marginRight: '20px',
                width: '100px',
                textAlign: 'center',
              }}
            >
              {tag}
            </CheckableTag>
          ))}
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={2}>客户类型：</Col>
        <Col span={3}>
          <TreeSelect
            style={{ width: '100%' }}
            value={treeValue}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="Please select"
            treeDefaultExpandAll
            onChange={treeValueChange}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <Line {...config} style={{ width: '100%' }} />
      </Row>
    </Card>
  );
};

export default StoresIndicators;
