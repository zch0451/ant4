import {Button, Form, Modal, Switch, Input,Badge,Tabs} from "antd";
const {TabPane}=Tabs
import React from "react";
import DescriptionList from '@/newComponents/DescriptionList';
import {hasPermition} from '@/utils/permition';
import {MAPBTG} from '@/utils/tools';
import './common.less';

const {Description} = DescriptionList;
import Link from 'umi/link';

//详情
class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isnormal: null,
      latitude: '',
      longitude: '',
      point: {},
      mapVisible: false
    }
  }

  openMap = () => {
    this.setState({mapVisible: true})
  }
  closeMap = () => {
    this.setState({
      mapVisible: false
    })
  }
  resetState = () => {
    this.setState({
      isnormal: null,
      latitude: '',
      longitude: '',
    })
  }
  editlocal = (point) => {
    point = MAPBTG(point.lat, point.lng);
    this.setState({
      longitude: point.lng,
      latitude: point.lat
    })
  }

  render() {
    const {
      modalDetailVisible,
      form,
      currentDetail,
      updateHandle,
      hideModalVisible,
    } = this.props;
    const {mapVisible, latitude, longitude, isnormal} = this.state;
    const {getFieldDecorator} = form;
    const formItemLayout = {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 15
      },
    };
    const closeModal = () => {
      this.resetState()
      hideModalVisible()
    }
    const okHandle = () => {
      const {isnormal, latitude, longitude} = this.state;
      if (isnormal !== null || latitude !== '' || longitude !== '') {
        let params = {id: currentDetail.id}
        if (isnormal) params.isnormal = isnormal;
        if (latitude) params.latitude = latitude;
        if (longitude) params.longitude = longitude;
        updateHandle(params);
        closeModal()
      } else {
        closeModal()
      }
    }

    return (
      <Modal
        destroyOnClose
        title="支撑头"
        visible={modalDetailVisible}
        onOk={okHandle}
        footer={[
          <Button key="back" onClick={() => {
            closeModal()
          }}>
            关闭
          </Button>
        ]}
        width={1200}
        onCancel={() => {
          closeModal()
        }}
      >
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="基础数据" key="1">
            <DescriptionList size="large" col={1}>
              <Description term="所属油源柜编号">{currentDetail ? currentDetail.yygno || '-' : '-'}</Description>
            </DescriptionList>
            <DescriptionList size="large" col={3}>
              <Description term="支撑头名称">{currentDetail ? currentDetail.zhicName || '-' : '-'}</Description>
              <Description term="出油口的唯一号">{currentDetail ? currentDetail.zhicNo || '-' : '-'}</Description>
              <Description term="物理号">{currentDetail ? currentDetail.wulihao || '-' : '-'}</Description>
              <Description term="出油口状态">{currentDetail ? ['未建立', '已建立'][currentDetail.status] || '-' : '-'}</Description>
              <Description term="创建时间">{currentDetail ? currentDetail.createdate || '-' : '-'}</Description>
            </DescriptionList>
            <DescriptionList size="large" col={1}>
              <Description term="轴力设定值">{currentDetail ? currentDetail.forceSet || '-' : '-'}</Description>
            </DescriptionList>
            <DescriptionList size="large" col={2}>
              <Description term="补压起控力值">{currentDetail ? currentDetail.forceStart || '-' : '-'}</Description>
              <Description term="补压结束力值">{currentDetail ? currentDetail.forceEnd || '-' : '-'}</Description>
              <Description term="力值黄色告警">{currentDetail ? currentDetail.forceYellow || '-' : '-'}</Description>
              <Description term="力值红色告警">{currentDetail ? currentDetail.forceRed || '-' : '-'}</Description>
            </DescriptionList>
            <DescriptionList size="large" col={1}>
              <Description term="位移设定值">{currentDetail ? currentDetail.posSet || '-' : '-'}</Description>
            </DescriptionList>
            <DescriptionList size="large" col={2} style={{marginBottom:15}}>
              <Description term="位移黄色告警">{currentDetail ? currentDetail.posYellow || '-' : '-'}</Description>
              <Description term="位移红色告警">{currentDetail ? currentDetail.posRed || '-' : '-'}</Description>
            </DescriptionList>
          </TabPane>
          <TabPane tab="千斤顶相关" key="2">
            <DescriptionList size="large" col={1}>
              <Description term="千斤顶编号">{currentDetail ? currentDetail.qjdbianhao || '-' : '-'}</Description>
            </DescriptionList>
            <DescriptionList size="large" col={2}>
              <Description term="截面积">{currentDetail ? currentDetail.qjdArea || '-' : '-'}</Description>
              <Description term="工作长度">{currentDetail ? currentDetail.qjdworklength || '-' : '-'}</Description>
              <Description term="最大工作油压">{currentDetail ? currentDetail.qjdMaxMpa || '-' : '-'}</Description>
              <Description term="千斤顶吨位">{currentDetail ? currentDetail.QJDMaxKn || '-' : '-'}</Description>
            </DescriptionList>
          </TabPane>
          <TabPane tab="力传感器相关" key="3">
            <DescriptionList size="large" col={2}>
              <Description term="力传感器的编号">{currentDetail ? currentDetail.libianhao || '-' : '-'}</Description>
              <Description term="类型">{currentDetail ? currentDetail.lileixing || '-' : '-'}</Description>
              <Description term="参数K">{currentDetail ? currentDetail.liParK || '-' : '-'}</Description>
              <Description term="参数B">{currentDetail ? currentDetail.liParB || '-' : '-'}</Description>
              <Description term="最大压强">{currentDetail ? currentDetail.liMaxMpa || '-' : '-'}</Description>
            </DescriptionList>
          </TabPane>
          <TabPane tab="位移传感器相关" key="4">
            <DescriptionList size="large" col={2}>
              <Description term="编号">{currentDetail ? currentDetail.wybianhao || '-' : '-'}</Description>
              <Description term="类型">{currentDetail ? currentDetail.wyleixing || '-' : '-'}</Description>
              <Description term="参数K">{currentDetail ? currentDetail.wyParK || '-' : '-'}</Description>
              <Description term="参数B">{currentDetail ? currentDetail.wyParB || '-' : '-'}</Description>
              <Description term="最大长度">{currentDetail ? currentDetail.wyMaxLen || '-' : '-'}</Description>
            </DescriptionList>
          </TabPane>
          <TabPane tab="实时数据" key="5">
            <DescriptionList size="large" col={2}>
              <Description term="出油口的状态">{currentDetail ? ['未创建','未监控','监控中'][Number(currentDetail.status)] || '-' : '-'}</Description>
              <Description term="实时轴力">{currentDetail ? <Badge status={['success','warning','error'][Number(currentDetail.forceAlert)]} text={currentDetail.wForce} /> || '-' : '-'}KN</Description>
              <Description term="实时位置">{currentDetail ? <Badge status={['success','warning','error'][Number(currentDetail.posAlert)]} text={currentDetail.fPosition} /> || '-' : '-'}mm</Description>
              <Description term="温度">{currentDetail ? currentDetail.temperature|| '-' : '-'}℃</Description>
              <Description term="出油口油压">{currentDetail ? currentDetail.fPress || '-' : '-'}MPa</Description>
            </DescriptionList>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

const DetailForm = Form.create()(Detail);
export default DetailForm
