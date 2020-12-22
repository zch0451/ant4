import {Form, Input, Modal, Button, Select, DatePicker, Row, Col,Icon} from 'antd';
import moment from 'moment';
import UploadFile from '@/newcomponents/uploadFile';
import React from 'react';
import {stringify} from "qs";
import '../../common/common.less'

const { TextArea } = Input;
const {RangePicker}=DatePicker;
const FormItem = Form.Item;
class IlleGal extends React.Component{
  constructor(props){
    super(props);
    this.state={
      responseVisible:false,
      fieldsValue:{}
    }
    this.responseOkHandle=this.responseOkHandle.bind(this);
  }
  responseOkHandle(filed){
    console.log('直接回答')
    let fieldsValue={...this.state.fieldsValue};
    fieldsValue=Object.assign(fieldsValue,filed)
    this.props.handleAdd(fieldsValue)
    this.responseCancelHandle()
  }
  responseCancelHandle(){
    this.setState({
      responseVisible:false
    })
  }
  showResponseVisible(){
    this.setState({
      responseVisible:true
    })
  }
  uploadCallback=(res)=>{
    let fileurl=JSON.parse(this.props.form.getFieldValue('fileurl')||"[]");
    if(res.length){
      fileurl=fileurl.concat(res)
    }
    this.props.form.setFieldsValue({fileurl:JSON.stringify(fileurl)})
  }
  removeFile=(info)=>{
    let fileurl=JSON.parse(this.props.form.getFieldValue('fileurl')||"[]");
    fileurl.forEach((item,index)=>{
      if (JSON.stringify(item)===JSON.stringify(info)){
        fileurl.splice(index,1);
      }
    })
    this.props.form.setFieldsValue({fileurl:JSON.stringify(fileurl)})
  }
  render() {
    const { modalVisible, form, handleAdd, handleModalVisible,current } = this.props;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        if(fieldsValue.timeArr&&fieldsValue.timeArr.length>0){
          fieldsValue.begin_time=fieldsValue.timeArr[0].format('YYYY-MM-DD');
          fieldsValue.end_time=fieldsValue.timeArr[1].format('YYYY-MM-DD');
        }

        handleAdd(fieldsValue);
      });
    };
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 16
      },
    }
    const singleFormItemLayout = {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 20
      },
    }
    return (
      <Modal
        maskClosable={false}
        style={{ top: 30 }}
        width={850}
        destroyOnClose
        title="新增合同"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        footer={[

          <Button key="submitOther" type="primary"  onClick={()=>okHandle()}>
            添加
          </Button>,
          <Button key="back" onClick={()=>{handleModalVisible(false)}}>
            取消
          </Button>
        ]}
      >
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="合同名称"
            >
              {form.getFieldDecorator('name', {
                initialValue:current?current.name:null,
                rules: [
                  {
                    required: true,
                    message: '该字段必填',
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="合同编号"
            >
              {form.getFieldDecorator('number', {
                initialValue:current?current.number:null,
                rules: [
                  {
                    required: true,
                    message: '该字段必填',
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="合同类型"
            >
              {form.getFieldDecorator('type', {
                initialValue:current?current.type:null,
                rules: [
                  {
                    required: true,
                    message: '该字段必填',
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="合同起止时间"
            >
              {form.getFieldDecorator('timeArr',{
                initialValue:current&&current.begin_time?[moment(current.begin_time),moment(current.end_time)]:null,
              })(
                <RangePicker
                  style={{width:'100%'}}
                  format="YYYY-MM-DD"
                  placeholder={['起始时间', '结束时间']}
                />
              )}
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="合同金额"
            >
              {form.getFieldDecorator('money', {
                initialValue:current?current.money:null,
                rules: [
                  {
                    required: true,
                    message: '该字段必填',
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <fieldset>
          <legend>甲方信息</legend>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="甲方名称"
              >
                {form.getFieldDecorator('name_a', {
                  initialValue:current?current.name_a:null,
                  rules: [
                    {
                      required: true,
                      message: '该字段必填',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="甲方电话"
              >
                {form.getFieldDecorator('phone_a', {
                  initialValue:current?current.phone_a:null,
                  rules: [
                    {
                      required: true,
                      message: '该字段必填',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                {...singleFormItemLayout}
                label="甲方地址"
              >
                {form.getFieldDecorator('address_a', {
                  initialValue:current?current.address_a:null,
                  rules: [
                    {
                      required: true,
                      message: '该字段必填',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
        </fieldset>
        <fieldset>
          <legend>乙方信息</legend>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="乙方名称"
              >
                {form.getFieldDecorator('name_b', {
                  initialValue:current?current.name_b:null,
                  rules: [
                    {
                      required: true,
                      message: '该字段必填',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="乙方电话"
              >
                {form.getFieldDecorator('phone_b', {
                  initialValue:current?current.phone_b:null,
                  rules: [
                    {
                      required: true,
                      message: '该字段必填',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                {...singleFormItemLayout}
                label="乙方地址"
              >
                {form.getFieldDecorator('address_b', {
                  initialValue:current?current.address_b:null,
                  rules: [
                    {
                      required: true,
                      message: '该字段必填',
                    },
                  ],
                })(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          </Row>
        </fieldset>
        <Row>
          <Col span={24}>
            <FormItem
              {...singleFormItemLayout}
              label="备注"
            >
              {form.getFieldDecorator('remark', {
                initialValue:current?current.remark:null,
                rules: [
                  {
                    required: true,
                    message: '该字段必填',
                  },
                ],
              })(<Input.TextArea placeholder="请输入" autoSize={{minRows: 4}}/>)}
            </FormItem>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default Form.create()(IlleGal);
