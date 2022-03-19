import React, { useState } from 'react';
import { Row, Col, Radio, Card, Tag } from 'antd';
import { Column, Pie, measureTextWidth} from '@ant-design/plots';

type Data = {
  type: string;
  sales: number;
}[]

const { CheckableTag } = Tag;

const tagsData = ['订单数', '销售额', '新增客户数', '消费客户数', '销售额占比', '订单数占比'];

const data = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];

const sortData = (data: Data) => {
  return data.sort((a, b) => {
    return (b.sales - a.sales);
  });
};

const config = {
  data: sortData(data),
  xField: 'type',
  yField: 'sales',
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  yAxis: {
    grid: {
      line: {
        style: {
          lineDash: [8, 5],
        },
      },
    },
  },
  color: '#3ba1ff',
};

const CustomerTags = () => {

  const [selectedTags, setSelectedTag] = useState(['销售额']);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTag(nextSelectedTags);
  };

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

  return (
    <>
      <Row justify="center" align="middle">
        <Col>客户标签分析</Col>
        <Col style={{ position: 'absolute', right: 0 }}>
          <span style={{ marginRight: 20 }}>标签：</span>
          <Radio.Group defaultValue="a">
            <Radio.Button value="a" style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>一级标签</Radio.Button>
            <Radio.Button value="b">二级标签</Radio.Button>
            <Radio.Button value="c">三级标签</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Card>
        <Row>
          <Col span={13}>
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
            <Row style={{ marginTop: 20 }}>
              <Column style={{ width: '100%' }} {...config} />
            </Row>
          </Col>
          <Col span={10} offset={1}>
            <Row style={{ borderBottom: '1px solid #eee', height: 40 }}>客户标签占比：</Row>
            <Row style={{ marginTop: 10 }}>
              <Radio.Group defaultValue="a">
                <Radio.Button value="a"
                              style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>客户数</Radio.Button>
                <Radio.Button value="b">销售额</Radio.Button>
              </Radio.Group>
            </Row>
            <Row>
              <Pie {...pieConfig} style={{ width: '100%' }} />
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CustomerTags;
