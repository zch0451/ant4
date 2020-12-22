import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  notification,
  Badge,
  Divider,
  Switch,
  Radio,
  Tree,
} from 'antd';

const {TreeNode} = Tree;
import StandardTable from '@/newcomponents/StandardTable';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {formatMessage, FormattedMessage} from 'umi-plugin-react/locale';

import styles from '@/pages/list/table-list/style.less';

const FormItem = Form.Item;

@connect(({departmentcontrol, loading}) => ({
  departmentcontrol,
  loading: loading.effects['departmentcontrol/getDepartment'],
}))
@Form.create()

class department extends PureComponent {
  state = {
    current: null,
    addChild: false,
  };

  componentDidMount() {
    this.initData();
  }

  initData = (id) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'departmentcontrol/getDepartment',
      payload: {
        parentid: id ? id : -1
      }
    });
  }

  addRootTree = (e) => {
    const {dispatch, form} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        for (let key in values) {
          if (!values[key]) {
            delete values[key];
          }
        }
        ;
        dispatch({
          type: 'departmentcontrol/addRootDepartment',
          payload: values,
          callback: () => {
            this.initData();
            message.success('添加根节点成功');
            form.resetFields();
          }
        });
      }
    });
  }
  updateTree = (e) => {
    const {dispatch, form} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        for (let key in values) {
          if (!values[key]) {
            delete values[key];
          }
        }
        ;
        values.id = this.state.current.id;
        dispatch({
          type: 'departmentcontrol/updateDepartment',
          payload: values,
          callback: {
            callbacksuccess: () => {
              this.initData(this.state.current.parentid);
              this.getDepartmentDetail(values.id);
              message.success('更新节点成功');
            },
            callbackfail: () => {
              message.error('更新节点失败');
            }
          }
        });
      }
    });
  }
  buttonDelete = (e) => {
    e.preventDefault();
    Modal.confirm({
      title: '删除节点',
      content: '确定删除该节点吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.deleteTree(),
    });
  };
  deleteTree = () => {
    const {dispatch, form} = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        for (let key in values) {
          if (!values[key]) {
            delete values[key];
          }
        }
        ;
        values.id = this.state.current.id;
        dispatch({
          type: 'departmentcontrol/deleteDepartment',
          payload: values,
          callback: {
            callbacksuccess: () => {
              this.initData(this.state.current.parentid);
              this.setState({
                current: null
              });
              this.props.form.resetFields();
              message.success('删除节点成功');
            },
            callbackfail: () => {
              message.error('删除节点失败');
            }
          }
        });
      }
    });
  }
  buttonAddChild = () => {
    this.props.form.resetFields();
    this.setState({
      addChild: true
    });
  }
  cancelAddChild = () => {
    this.props.form.resetFields();
    this.setState({
      addChild: false
    });
  }
  addChild = (e) => {
    const {dispatch, form} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        for (let key in values) {
          if (!values[key]) {
            delete values[key];
          }
        }
        ;
        values.parentid = this.state.current.id;
        dispatch({
          type: 'departmentcontrol/addDepartment',
          payload: values,
          callback: {
            callbacksuccess: () => {
              this.initData(this.state.current.id);
              this.props.form.resetFields();
              this.setState({
                addChild: false
              });
              message.success('新增节点成功');
            },
            callbackfail: () => {
              message.error('新增节点失败');
            }
          }
        });
      }
    });
  }


  onLoadData = treeNode =>
    new Promise(resolve => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      const {dispatch} = this.props;
      dispatch({
        type: 'departmentcontrol/getDepartment',
        payload: {
          parentid: treeNode.props.dataRef.id
        },
        callback: () => resolve()
      });
    });
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item}/>;
    });
  chooseTree = (selectedKeys, e) => {
    if (!selectedKeys[0]) {
      this.setState({
        current: null
      });
      this.props.form.resetFields();
      return;
    }
    this.getDepartmentDetail(selectedKeys[0]);
  }
  getDepartmentDetail = (id) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'departmentcontrol/detailDepartment',
      payload: {
        id: id
      },
      callback: (item) => {
        if (!this.state.addChild) {
          this.props.form.setFieldsValue({
            code: item.code,
            name: item.name,
            type: item.type,
            sortcode: item.sortcode,
            remark: item.remark
          });
        }
        this.setState({
          current: item
        })
      }
    });
  }

  render() {
    const {
      departmentcontrol: {data: {tree}},
      form: {getFieldDecorator},
      loading,
    } = this.props;
    const {treenodeID, current, addChild} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
        md: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 17},
        md: {span: 12},
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 17, offset: 7},
        md: {span: 12, offset: 6},
      },
    };

    return (
      <PageHeaderWrapper title="部门管理">
        <Row gutter={24}>
          <Col lg={9} md={24}>
            <Card bordered={false} style={{overflow: 'auto'}}>
              {tree.length == 0 && (
                <span>无部门信息，请添加根节点</span>
              )}
              <Tree
                showLine
                onSelect={this.chooseTree}
                loadData={this.onLoadData}>
                {this.renderTreeNodes(tree)}
              </Tree>
            </Card>
          </Col>
          <Col lg={15} md={24}>
            <Card bordered={false}>
              <Form style={{marginTop: 8}}>
                <FormItem {...formItemLayout} label="部门编码">
                  {getFieldDecorator('code', {
                    initialValue: current && !addChild ? current.code : null,
                  })(
                    <Input placeholder="请输入部门编码"/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="部门名称">
                  {getFieldDecorator('name', {
                    rules: [{required: true, message: '请输入部门名称'}],
                    initialValue: current && !addChild ? current.name : null,
                  })(
                    <Input placeholder="请输入部门名称"/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="部门类型">
                  {getFieldDecorator('type', {
                    initialValue: current && !addChild ? current.type : null,
                  })(
                    <Input placeholder="请输入部门类型"/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="排序码">
                  {getFieldDecorator('sortcode', {
                    initialValue: current && !addChild ? current.sortcode : null,
                  })(
                    <Input placeholder="请输入排序码"/>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="备注">
                  {getFieldDecorator('remark', {
                    initialValue: current && !addChild ? current.remark : null,
                  })(
                    <Input placeholder="请输入备注"/>
                  )}
                </FormItem>
                {tree.length == 0 && (
                  <FormItem {...submitFormLayout} style={{marginTop: 32}}>
                    <Button type="primary" onClick={(e) => this.addRootTree(e)}>添加根节点</Button>
                  </FormItem>
                )}
                {tree.length > 0 && !addChild && (
                  <FormItem {...submitFormLayout} style={{marginTop: 32}}>
                    <Button style={{marginRight: 8}} type="primary"
                            disabled={!current}
                            onClick={(e) => this.updateTree(e)}>更新</Button>
                    <Button style={{marginRight: 8}}
                            disabled={!current}
                            onClick={(e) => this.buttonDelete(e)}>删除</Button>
                    <Button icon="plus"
                            disabled={!current}
                            onClick={() => this.buttonAddChild()}>添加子节点</Button>
                  </FormItem>
                )}
                {tree.length > 0 && current && addChild && (
                  <FormItem {...submitFormLayout} style={{marginTop: 32}}>
                    <Button style={{marginRight: 8}} type="primary"
                            onClick={(e) => this.addChild(e)}>新增</Button>
                    <Button onClick={() => this.cancelAddChild()}>取消</Button>
                  </FormItem>
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default department;
