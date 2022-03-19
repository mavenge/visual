import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Tag, TreeSelect, Card, Radio } from 'antd';
import { Line, measureTextWidth, Pie } from '@ant-design/plots';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

const option: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  legend: {
    data: ['新客户数', '老客户数', '客户数', '销售金额'],
    x: 'right',
    icon: 'circle',
    itemHeight: 7, //修改icon图形大小
  },
  xAxis: [
    {
      type: 'category',
      data: ['高新体验', '创智谷', '汉峡金谷', '奥盛大厦', '益好旗舰', '惠东国际店', '礼耕店'],
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 60,
      interval: 15,
    },
    {
      type: 'value',
      min: 0,
      max: 60,
      interval: 15,
    },
  ],
  series: [
    {
      name: '新客户数',
      type: 'bar',
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 12.7, 33.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
      barWidth: '10%',
      color: '#3ba1ff'
    },
    {
      name: '老客户数',
      type: 'bar',
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 55.7, 23.6, 182.2, 48.7, 18.8, 6.0, 2.3,
      ],
      barWidth: '10%',
      color: '#4fcb74'
    },
    {
      name: '客户数',
      type: 'bar',
      barGap: '70%',
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
      barWidth: '10%',
      color: '#fad337'
    },
    {
      name: '销售金额',
      type: 'line',
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
      color: '#f4232e'
    },
  ],
}

const { CheckableTag } = Tag;

const tagsData = ['销售额', '订单量', '客单数', '销售额占比', '客户数占比'];

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
  color: ['#178ffe', '#f5323d', '#feb33a', '#97d77c'],
  legend: {
    position: 'top-right',
    items: [
      {
        name: '纸杯',
        marker: {
          style: { r: 4, fill: '#178ffe' },
          symbol: 'square',
        },
      },
      {
        name: '照片书',
        marker: {
          style: { r: 4, fill: '#f5323d' },
          symbol: 'square',
        },
      },
      {
        name: '摄影',
        marker: {
          style: { r: 4, fill: '#feb33a' },
          symbol: 'square',
        },
      },
      {
        name: '台历',
        marker: {
          style: { r: 4, fill: '#97d77c' },
          symbol: 'square',
        },
      },
    ],
  },
  data: [
    { month: '一月', category: '纸杯', value: 677 },
    { month: '一月', category: '台历', value: 590 },
    { month: '一月', category: '纸杯', value: 611 },
    { month: '二月', category: '摄影', value: 122 },
    { month: '二月', category: '照片书', value: 370 },
    { month: '二月', category: '纸杯', value: 296 },
    { month: '三月', category: '摄影', value: 626 },
    { month: '三月', category: '照片书', value: 462 },
    { month: '三月', category: '纸杯', value: 111 },
    { month: '四月', category: '台历', value: 111 },
    { month: '四月', category: '照片书', value: 863 },
    { month: '四月', category: '摄影', value: 87 },
    { month: '五月', category: '台历', value: 642 },
    { month: '五月', category: '摄影', value: 850 },
    { month: '五月', category: '纸杯', value: 125 },
    { month: '六月', category: '台历', value: 187 },
    { month: '六月', category: '台历', value: 934 },
    { month: '六月', category: '纸杯', value: 708 },
  ],
};

const ProductionsIndicators = () => {

  const [selectedTags, setSelectedTag] = useState(['销售额']);
  const [treeValue, setTreeValue] = useState();
  const [production, setProduction] = useState('全部');
  const echartsContainer = useRef();

  useEffect(() => {
    const chartDom = echartsContainer.current;
    const myChart = echarts?.init(chartDom);
    myChart.setOption(option);
  }, []);

  const renderStatistic = (containerWidth: number, text: string, style: {}) => {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  };

  const pieData = [
    {
      type: '家用电器',
      value: 27,
    },
    {
      type: '食用酒水',
      value: 25,
    },
    {
      type: '个护健康',
      value: 18,
    },
    {
      type: '服装箱包',
      value: 15,
    },
    {
      type: '母婴产品',
      value: 10,
    },
    {
      type: '其他产品',
      value: 5,
    },
  ];

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      type: {
        formatter: (v: string, index: number | undefined) => {
          return `${v}      |      ${pieData[index!]?.value}%       ￥ 1234`;
        },
      },
    },
    label: false,
    statistic: {
      title: {
        offsetY: -40,
        customHtml: (container: any, view: any, datum: any) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '销售额';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '26px',
        },
        customHtml: (container: any, view: any, datum: any, data: any) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `¥ ${datum.value}` : `¥ ${data.reduce((r: string, d: any) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTag(nextSelectedTags);
  };

  const treeValueChange = (value: any) => {
    setTreeValue(value);
  };

  const productionValueChange = (value: any) => {
    setProduction(value);
  };

  return (
    <>
      <Row justify="center">产品指标环比数据</Row>
      <Card>
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
          <Col>
            <TreeSelect
              style={{ width: '100%', minWidth: 200 }}
              value={treeValue}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={treeData}
              placeholder="Please select"
              treeDefaultExpandAll
              onChange={treeValueChange}
              multiple
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }}>
          <Line {...config} style={{ width: '100%' }} />
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col span={11}>
            <Row justify="center">产品占比分布</Row>
            <Card style={{ marginTop: 20 }}>
              <Row>
                <Radio.Group defaultValue="a">
                  <Radio.Button value="a">订单数</Radio.Button>
                  <Radio.Button value="b">销售额</Radio.Button>
                </Radio.Group>
              </Row>
              <Row>
                <Pie {...pieConfig} style={{ width: '100%' }} />
              </Row>
            </Card>
          </Col>
          <Col span={13}>
            <Card style={{ height: '100%' }}>
              <Row justify="center">产品各店铺指标情况</Row>
              <Row align="middle">
                <Col span={2}>产品：</Col>
                <Col>
                  <TreeSelect
                    style={{ width: '100%', minWidth: 200 }}
                    value={production}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeData}
                    placeholder="Please select"
                    treeDefaultExpandAll
                    onChange={productionValueChange}
                  />
                </Col>
              </Row>
              <Row>
                <div ref={echartsContainer} style={{ height: '420px', width: '100%' }}></div>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProductionsIndicators;
