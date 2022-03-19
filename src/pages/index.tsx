import React from 'react';
import { Card, Space } from 'antd';

import CoreIndicator from './components/CoreIndicator';
import ShopManage from './components/ShopManage';
import StoresIndicators from '@/pages/components/StoresIndicators';
import Consumption from './components/Consumption';
import CustomerTags from '@/pages/components/CustomerTags';
import ProductionsIndicators from '@/pages/components/ProductionsIndicators';
import DataCompare from '@/pages/components/DataCompare';


export default function IndexPage() {
  return (
    <>
      <Space direction="vertical">
        <Card>
          <CoreIndicator />
          <ShopManage />
        </Card>
        <StoresIndicators />
        <Consumption />
        <CustomerTags />
        <ProductionsIndicators />
        <DataCompare />
      </Space>
    </>
  );
}
