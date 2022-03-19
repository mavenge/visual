import React, { useRef, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
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
    data: ['半天妖订单数', '其他客户订单数', '半天妖营业额', '其他客户营业额'],
    x: 'right',
    icon: 'circle',
    itemHeight: 7, //修改icon图形大小
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '订单数',
      min: 0,
      max: 60,
      interval: 15,
    },
    {
      type: 'value',
      name: '营业额',
      min: 0,
      max: 60,
      interval: 15,
    },
  ],
  series: [
    {
      name: '半天妖订单数',
      type: 'bar',
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 12.7, 33.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
      barWidth: '10%',
      color: '#3ba1ff',
    },
    {
      name: '其他客户订单数',
      type: 'bar',
      barGap: '70%',
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 55.7, 23.6, 182.2, 48.7, 18.8, 6.0, 2.3,
      ],
      barWidth: '10%',
      color: '#4fcb74',
    },
    {
      name: '半天妖营业额',
      type: 'line',
      yAxisIndex: 1,
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 55.7, 23.6, 182.2, 48.7, 18.8, 6.0, 2.3,],
      color: '#fad337',
    },
    {
      name: '其他客户营业额',
      type: 'line',
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
      color: '#f4232e',
    },
  ],
};

const DataCompare = () => {

  const echartsContainer = useRef();

  useEffect(() => {
    const chartDom = echartsContainer.current;
    const myChart = echarts?.init(chartDom);
    myChart.setOption(option);
  }, []);

  return (
    <>
      <Row justify="center">高新体验店数据对比</Row>
      <Card>
        <div ref={echartsContainer} style={{ height: '500px', width: '100%' }}></div>
      </Card>
    </>
  );
};

export default DataCompare;
