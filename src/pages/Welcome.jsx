import { Card } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import welcome from '../assets/welcome.png';

class Welcome extends Component {
  render() {
    return (
      <PageHeaderWrapper title="欢迎你">
        <Card bordered={false}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={welcome} style={{margin: '80px auto 20px', width: '120px'}}/>
            <span style={{fontSize: '16px', color: 'gray', marginBottom: '80px'}}>欢迎使用下城区文晖街道督查管理平台</span>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Welcome;
