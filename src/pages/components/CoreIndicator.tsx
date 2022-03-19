import { Card, Row, Col, Space, Statistic, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import CardTitle from './CardTitle';
import {
  ExclamationCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Gauge } from '@ant-design/plots';

const { CheckableTag } = Tag;

const tagsData = ['200', '500', '1000', '2000'];

const config = {
  percent: 0.75,
  width: 300,
  height: 300,
  range: {
    color: '#369ffe',
  },
  indicator: {
    pointer: {
      style: {
        stroke: '#369ffe',
      },
    },
    pin: {
      style: {
        stroke: '#369ffe',
      },
    },
  },
  axis: {
    label: {
      formatter(v: string) {
        return Number(v) * 100 + '%';
      },
    },
    subTickLine: {
      count: 3,
    },
  },
  statistic: {
    content: {
      formatter: ({ percent }: { percent: number }) =>
        `完成进度: ${(percent * 100).toFixed(0)}%`,
      style: {
        color: '#000',
        fontSize: 16,
      },
    },
  },
};

function CoreIndicator() {

  const [selectedTags, setSelectedTag] = useState(['200']);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTag(nextSelectedTags);
  };

  return (
    <div>
      <Row justify="center">
        <h2 style={{ fontWeight: '700' }}>整体核心指标</h2>
      </Row>
      <Row style={{ justifyContent: 'center' }} gutter={10}>
        <Col span={6}>
          <Card
            style={{ width: 450, height: '100%' }}
            title={<CardTitle left="销售额目标：" mid="5000.0元" />}
          >
            <Row justify="center" style={{ marginTop: '-30px' }}>
              <Gauge {...config} />
            </Row>
            <Row justify="center" style={{ marginTop: '-40px' }}>
              时间进度：<span style={{ color: 'red' }}>60%</span>
            </Row>
            <Row align="middle">
              <Col span={12}>完成值：2563：56</Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <div>
                  周同比：
                  <CaretUpOutlined style={{ color: 'green' }} /> 12%
                </div>
                <div>
                  日环比：
                  <CaretDownOutlined style={{ color: 'red' }} />
                  11%
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={6}>
          <Card style={{ width: 450, height: '30%' }}>
            <Row
              justify="space-between"
              style={{ fontWeight: 500, fontSize: 16 }}
            >
              <Col>订单量：</Col>
              <Col>4000单</Col>
              <Col>
                <ExclamationCircleOutlined style={{ color: '#b5b5b5' }} />
              </Col>
            </Row>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginTop: 10 }}
            >
              <Col style={{ fontSize: 12, color: '#b3b3b3' }}>周同比</Col>
              <Col>
                <CaretUpOutlined style={{ color: 'green' }} /> 12%
              </Col>
              <Col style={{ fontSize: 12, color: '#b3b3b3' }}>周同比</Col>
              <Col>
                <CaretDownOutlined style={{ color: 'red' }} />
                11%
              </Col>
            </Row>
          </Card>
          <Card style={{ width: 450, height: '70%' }}>
            <Row
              justify="space-between"
              style={{ fontWeight: 500, fontSize: 16 }}
            >
              <Col>客单价：</Col>
              <Col>65.25</Col>
              <Col>
                <ExclamationCircleOutlined style={{ color: '#b5b5b5' }} />
              </Col>
            </Row>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginTop: 30 }}
            >
              <Col style={{ fontSize: 12, color: '#b3b3b3' }}>周同比</Col>
              <Col>
                <CaretUpOutlined style={{ color: 'green' }} /> 12%
              </Col>
              <Col style={{ fontSize: 12, color: '#b3b3b3' }}>周同比</Col>
              <Col>
                <CaretDownOutlined style={{ color: 'red' }} />
                11%
              </Col>
            </Row>
            <Row
              justify="space-between"
              style={{ fontWeight: 450, fontSize: 16, marginTop: 40 }}
            >
              <Col>客单价：</Col>
              <Col>65.25</Col>
              <Col>
                <ExclamationCircleOutlined style={{ color: '#b5b5b5' }} />
              </Col>
            </Row>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginTop: 30 }}
            >
              <Col style={{ fontSize: 12, color: '#b3b3b3' }}>周同比</Col>
              <Col>
                <CaretUpOutlined style={{ color: 'green' }} /> 12%
              </Col>
              <Col style={{ fontSize: 12, color: '#b3b3b3' }}>周同比</Col>
              <Col>
                <CaretDownOutlined style={{ color: 'red' }} />
                11%
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={6}>
          <Card
            style={{ width: 450, height: '100%' }}
            title={<CardTitle left="总消费客户数：" mid="4000" />}
          >
            <Space direction="vertical">
              <Card style={{ width: 400 }}>
                <Row justify="space-between">
                  <Col
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#0f8efe',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      fontSize: '40px',
                      color: '#fff',
                      borderRadius: '50%',
                    }}
                  >
                    <WalletOutlined />
                  </Col>
                  <Col>
                    <Statistic title="新增客户数" value={1234} />
                  </Col>
                  <Col>
                    <div style={{ textAlign: 'right' }}>
                      <ExclamationCircleOutlined
                        style={{
                          color: '#b5b5b5',
                          marginBottom: 30,
                        }}
                      />
                    </div>
                    <div>
                      周同比：
                      <CaretUpOutlined style={{ color: 'green' }} /> 12%
                    </div>
                    <div>
                      日环比：
                      <CaretDownOutlined style={{ color: 'red' }} />
                      11%
                    </div>
                  </Col>
                </Row>
              </Card>
              <Card style={{ width: 400 }}>
                <Row justify="space-between">
                  <Col
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#0f8efe',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      fontSize: '40px',
                      color: '#fff',
                      borderRadius: '50%',
                    }}
                  >
                    <WalletOutlined />
                  </Col>
                  <Col>
                    <Statistic title="新增客户数" value={1234} />
                  </Col>
                  <Col>
                    <div style={{ textAlign: 'right' }}>
                      <ExclamationCircleOutlined
                        style={{
                          color: '#b5b5b5',
                          marginBottom: 30,
                        }}
                      />
                    </div>
                    <div>
                      周同比：
                      <CaretUpOutlined style={{ color: 'green' }} /> 12%
                    </div>
                    <div>
                      日环比：
                      <CaretDownOutlined style={{ color: 'red' }} />
                      11%
                    </div>
                  </Col>
                </Row>
              </Card>
            </Space>
          </Card>
        </Col>

        <Col span={6}>
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
          <Card style={{ width: 450, height: '31.33%' }}>
            <Row>
              <Col span={12}>
                <div>200元以上客户数：</div>
                <div
                  style={{
                    paddingLeft: '30px',
                    fontSize: '22px',
                    fontWeight: 700,
                  }}
                >
                  4000
                </div>
                <div style={{ color: '#b7b7b7' }}>
                  <span>占比：</span>
                  <span style={{ marginLeft: '10px' }}>12%</span>
                </div>
              </Col>
              <Col span={12}>
                <div>200元以上销售额：</div>
                <div
                  style={{
                    paddingLeft: '30px',
                    fontSize: '22px',
                    fontWeight: 700,
                  }}
                >
                  4000
                </div>
                <div style={{ color: '#b7b7b7' }}>
                  <span>占比：</span>
                  <span style={{ marginLeft: '10px' }}>12%</span>
                </div>
              </Col>
            </Row>
          </Card>
          <Card style={{ width: 450, height: '31.33%' }}>
            <Row>
              <Col span={12}>
                <div>日好销售占比：</div>
                <div style={{ marginLeft: '30px' }}>65.25%</div>
              </Col>
              <Col span={12}>
                <div>
                  周同比：
                  <CaretUpOutlined style={{ color: 'green' }} /> 12%
                </div>
                <div>
                  日环比：
                  <CaretDownOutlined style={{ color: 'red' }} />
                  11%
                </div>
              </Col>
            </Row>
          </Card>
          <Card style={{ width: 450, height: '31.33%' }}>
            <Row>
              <Col span={12}>
                <div>日好销售占比：</div>
                <div style={{ marginLeft: '30px' }}>65.25%</div>
              </Col>
              <Col span={12}>
                <div>
                  周同比：
                  <CaretUpOutlined style={{ color: 'green' }} /> 12%
                </div>
                <div>
                  日环比：
                  <CaretDownOutlined style={{ color: 'red' }} />
                  11%
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CoreIndicator;
