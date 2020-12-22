import {Card, Button, Badge, Col, Row, Select, Input, message, Form, Divider,DatePicker} from 'antd';
import styles from './style.less';
import AddModal from './components/AddModal'
const FormItem = Form.Item;
const {Option} = Select;
const { RangePicker } = DatePicker;
import React, {Component, Fragment} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {getValue, concatStatus, exportDownload} from '@/utils/tools'
import {connect} from 'umi';
import StandardTable from '@/newComponents/StandardTable';
import { history } from 'umi';

@connect(({ConcatModel, dataSelect, loading}) => ({
  ConcatModel,
  dataSelect,
  loading: loading.global,
}))
class ConcatModel extends Component {
  state = {
    current:null,

    modalVisible:false,
    formValues: {},
    selectedRows: [],
    pagination: {
      current: 1,
      pageSize: 10,
    }
  };

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.isback) {

      let formValues = this.props.dataSelect.formValues;
      this.setState({
        formValues: {...this.props.dataSelect.formValues},
        pagination: {
          current: formValues.nowPage || 1,
          pageSize: formValues.pageSize || 10,
        },
      }, () => this.initData())
    } else {
      this.initData()
    }
  }

  showDetail = (obj) => {
    const {pagination}=this.state;
    this.props.dispatch({
      type:'dataSelect/saveFormValues',
      payload:{...this.state.formValues,
        ...{
          nowPage: pagination.current,
          pageSize: pagination.pageSize}}
    })
    history.push({pathname:'/contractDetail/'+obj.id,state:{laterPath:this.props.route.path}})
  }
  editDetail =(obj)=>{
    this.setState({
      modalVisible:true,
      current:obj
    })
  }
  initData = (params) => {
    const { pagination,formValues } = this.state;
    const { dispatch } = this.props;
    let param = params ? params : {...formValues};
    param.nowPage = param.nowPage?param.nowPage:pagination.current;
    param.pageSize = param.pageSize?param.pageSize:pagination.pageSize;
    dispatch({
      type:'ConcatModel/getList',
      payload:{...params}
    })
  }
  handleAdd(fileValues){
    this.props.dispatch({
      type:'ConcatModel/addObj',
      payload: fileValues,
      callback:()=>{
        this.handleAddModalVisible(false)
        this.initData()
      }
    })
  }
  handleAddModalVisible(flag){
    this.setState({
      modalVisible:!!flag
    })
  }
  handleFormReset = () => {//重置
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.initData({YYGNo: this.state.YYGNo});
  };
  handleSearch = e => {//查询
    e.preventDefault();
    const {dispatch, form} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      this.setState({
        formValues: values,
      });
      this.initData(values)
    });
  };
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      ...formValues,
      nowPage: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    this.setState({
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      }
    })
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    this.initData(params)
  };
  renderForm() {
    const {form} = this.props;
    const {formValues} = this.state;
    const {getFieldDecorator} = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="合同编号">
              {getFieldDecorator('number', {
                initialValue:formValues.number||null
              })(
               <Input placeholder={'请输入'}/>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="合同名称">
              {getFieldDecorator('name',{
                initialValue:formValues.name||null
              })(
                <Input placeholder='请输入'/>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem
              label='状态'
            >
              {form.getFieldDecorator('status', {
                initialValue:formValues.status||null
              })(<Select style={{width: '100%'}} placeholder={'请选择'}>
                <Option value={''}>{'全部'}</Option>
                {
                  concatStatus.map((item,index)=>{
                    return <Option value={item} key={index}>{item}</Option>
                  })
                }
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row
          gutter={{
            md: 8,
            lg: 24,
            xl: 48,
          }}
        >
          <Col md={8} sm={24}>
            <FormItem label="合同起止时间">
              {getFieldDecorator('timeArr',{
                initialValue:formValues.timeArr?formValues.timeArr:[]

              })(
                <RangePicker
                  style={{width:'100%'}}
                  format="YYYY-MM-DD"
                  placeholder={['起始时间', '结束时间']}
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="合同签定时间">
              {getFieldDecorator('signTimeArr',{
                initialValue:formValues.signTimeArr?formValues.signTimeArr:[]
              })(
                <RangePicker
                  style={{width:'100%'}}
                  format="YYYY-MM-DD"
                  placeholder={['起始时间', '结束时间']}
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {detailVisible, obj, selectedRows, TimeVisible} = this.state;
    const {ConcatModel: {data}, loading} = this.props;
    let columns = [
      {
        title: '序号',
        dataIndex: 'index'
      },
      {
        title: '合同编号',
        dataIndex: 'number',
      },
      {
        title: '合同名称',
        dataIndex: 'name',
      },
      {
        title: '合同甲方',
        dataIndex: 'name_a',
      },
      {
        title: '合同乙方',
        dataIndex: 'name_b',
      },
      {
        title: '合同金额',
        dataIndex: 'money',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (val) => {
          val = val === null ? 0 : val;
          let color = ['default','process', 'success', 'error'][val];
          let text = concatStatus[val];
          return <Badge status={color} text={text}/>
        }
      },
      {
        title: '合同起始时间',
        dataIndex: 'begin_time',
      },
      {
        title: '合同结束时间',
        dataIndex: 'end_time',
      },
      {
        title: '操作',
        render: (record) => {
          return (
            <Fragment>
              <a onClick={() => this.showDetail(record)}>查看</a>
              <Divider type="vertical" />
              {
                <a onClick={() => this.editDetail(record)}>编辑</a>
              }
            </Fragment>
          )
        }
      },
    ]
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button  icon='plus' type="primary" onClick={() => {this.setState({current:null});this.handleAddModalVisible(true)}}>
                新增
              </Button>
              <Button type="default"
                      onClick={() => exportDownload('/dc_contract/excelDownload', this.state.formValues)}>
                导出
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              rowKey={'index'}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <AddModal
          current={this.state.current}
          modalVisible={this.state.modalVisible}
          handleAdd={(fileValues)=>{this.handleAdd(fileValues)}}
          handleModalVisible={(flag)=>this.handleAddModalVisible(flag)}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(ConcatModel);
