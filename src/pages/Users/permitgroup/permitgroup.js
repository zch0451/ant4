import {
    Badge,
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Dropdown,
    Form,
    Icon,
    Input,
    InputNumber,
    Menu,
    Row,
    Select,
		message,
		Modal,
  } from 'antd';
  import React, { Component, Fragment } from 'react';
  import { PageHeaderWrapper } from '@ant-design/pro-layout';
  import { connect } from 'dva';
  import moment from 'moment';
  import CreateForm from './components/CreatePermitGroup';
  import StandardTable from '@/newcomponents/StandardTable';

	import styles from '@/pages/list/table-list/style.less';
  
  const FormItem = Form.Item;
	const { Option } = Select;

	const statusMap = ['error','processing'];
	const status = ['关闭','开启'];
  
  const getValue = obj =>
    Object.keys(obj)
      .map(key => obj[key])
      .join(',');
  
  /* eslint react/no-multi-comp:0 */
  @connect(({ permitgroup, loading }) => ({
    permitgroup,
    loading: loading.global,
  }))
  class PermitGroups extends Component {
    state = {
			modalVisible: false,
			current: null,

      selectedRows: [],
			formValues: {},
			
			pagination: {}
    };
  
    columns = [
      {
        title: '序号',
				dataIndex: 'index',
      },
      {
        title: '权限组名称',
				dataIndex: 'name',
      },
      {
        title: '是否开启',
				dataIndex: 'isopen',
				render(val) {
					return <Badge status={statusMap[val]} text={status[val]} />;
				},
      },
      {
        title: '排序码',
				dataIndex: 'sortcode',
			},
      {
        title: '操作',
        render: (rowitem) => (
          <Fragment>
						<a onClick={() => this.buttonEdit(rowitem)}>编辑</a>
						<Divider type="vertical" />
						<a onClick={() => this.buttonDelete(rowitem)}>删除</a>
          </Fragment>
        ),
      },
    ];
  
    componentDidMount() {
      this.initData();
		}
		initData = (params,type) => {
			const { dispatch } = this.props;
			const { pagination } = this.state;
			let param = params ? params : {};
			if(pagination.current && pagination.pageSize){
				param.nowPage = pagination.current;
				param.pageSize = pagination.pageSize;
			}
			if(type == 'search'){
				delete param.nowPage;
			}
			dispatch({
				type: 'permitgroup/fetch',
				payload: param
			});
		}
  
    handleStandardTableChange = (pagination, filtersArg) => {
      const { dispatch } = this.props;
      const { formValues } = this.state;
			this.setState({
				pagination: pagination
			}, ()=> {
				const filters = Object.keys(filtersArg).reduce((obj, key) => {
					const newObj = { ...obj };
					newObj[key] = getValue(filtersArg[key]);
					return newObj;
				}, {});
				const params = {
					...formValues,
					...filters,
				};
				this.initData(params);
			});
    };
  
    handleFormReset = () => {
      const { form, dispatch } = this.props;
      form.resetFields();
      this.setState({
        formValues: {},
      });
      this.initData();
    };
  
    handleSelectRows = rows => {
      this.setState({
        selectedRows: rows,
      });
		};
		
		buttonDelete = (rowitem) => {
			Modal.confirm({
				title: '删除权限组',
				content: '确定删除该权限组吗？',
				okText: '确认',
				cancelText: '取消',
				onOk: () => this.deleteById(rowitem.id),
			});
		};
		buttonDeleteAll = () => {
			Modal.confirm({
				title: '删除权限组',
				content: '确定删除选择的所有权限组么？',
				okText: '确认',
				cancelText: '取消',
				onOk: () => this.deleteByIds(),
			});
		};
		deleteById = (id) => {
			const { dispatch } = this.props;
			dispatch({
				type: 'permitgroup/deletePermitGroup',
				payload: {
					id: id
				},
				callback: () => {
					message.success('删除成功');
					this.setState({
						selectedRows: [],
					});
					this.initData();
				}
			});
		};
		deleteByIds = () => {
			const { dispatch } = this.props;
			let ids = [];
			this.state.selectedRows.map(row => {
					ids.push(row.id);
			});
			let deleteid = ids.join(',');
			dispatch({
				type: 'permitgroup/deletePermitGroups',
				payload: {
					ids: deleteid
				},
				callback: () => {
					message.success('删除成功');
					this.setState({
							selectedRows: [],
					});
					this.initData();
				}
			});
		};

		buttonEdit = (rowitem) => {
			const { dispatch } = this.props;
			//先从服务器更新最新数据
			dispatch({
				type: 'permitgroup/detailPermitGroup',
				payload: {
					id: rowitem.id
				},
				callback: (item) => {
					this.setState({
						modalVisible: true,
						current: item,
					});
				}
			});
		};
  
    handleSearch = e => {
      e.preventDefault();
      const { dispatch, form } = this.props;
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        const values = {
          ...fieldsValue
        };
        this.setState({
          formValues: values,
				});
				for(let key in values){
					typeof(values[key]) != 'number' && !values[key] && delete values[key];
				};
        this.initData(values,'search');
      });
    };
  
    handleModalVisible = flag => {
      this.setState({
				current: null,
				modalVisible: !!flag,
      });
		};
  
    handleAdd = fields => {
			const { dispatch } = this.props;
			for(let key in fields){
				typeof(fields[key]) != 'number' && !fields[key] && delete fields[key];
			};
      dispatch({
        type: 'permitgroup/addPermitGroup',
				payload: fields,
				callback: {
					callbacksuccess: () => {
							message.success('添加成功');
							this.initData();
							this.handleModalVisible();
					},
					callbackfail: () => {
							message.error('添加失败');
					}
				}
      });
    };
    handleUpdate = fields => {
			const { dispatch } = this.props;
			for(let key in fields){
				typeof(fields[key]) != 'number' && !fields[key] && delete fields[key];
			};
      dispatch({
        type: 'permitgroup/updatePermitGroup',
				payload: fields,
				callback: {
					callbacksuccess: () => {
							message.success('编辑成功');
							this.initData();
							this.handleModalVisible();
					},
					callbackfail: () => {
							message.error('编辑失败');
					}
				}
      });
		};
  
    renderSimpleForm() {
      const { form: {getFieldDecorator} } = this.props;
      return (
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row
						align="top" justify="start" type="flex"
            gutter={{
							xs: 8,
							sm: 16,
              md: 24,
              lg: 32,
            }}
          >
						<Col sm={24} md={12} lg={8} xl={6} >
              <FormItem label="名称">
                {getFieldDecorator('name')(<Input placeholder="请输入权限组名称" />)}
              </FormItem>
            </Col>
            <Col sm={24} md={12} lg={8} xl={6} >
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
      const {
        permitgroup: { data },
        loading,
      } = this.props;
      const { selectedRows, modalVisible, current } = this.state;
      
      const parentMethods = {
        handleAdd: this.handleAdd,
				handleUpdate: this.handleUpdate,
        handleModalVisible: this.handleModalVisible,
      };
      return (
        <PageHeaderWrapper title="权限组列表">
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <div className={styles.tableListOperator}>
                <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
									新建
                </Button>
                {selectedRows.length > 0 && (
                  <span>
                    <Button onClick={() => this.buttonDeleteAll()}>批量删除</Button>
                  </span>
                )}
              </div>
              <StandardTable
                selectedRows={selectedRows}
                loading={loading}
                data={data}
                columns={this.columns}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
              />
            </div>
          </Card>
          <CreateForm {...parentMethods} modalVisible={modalVisible} current={current} />
        </PageHeaderWrapper>
      );
    }
  }
  
  export default Form.create()(PermitGroups);
  