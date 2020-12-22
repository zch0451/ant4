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
		Tree,
		TreeSelect
  } from 'antd';
	const {TreeNode} =Tree;
  import React, { Component, Fragment } from 'react';
  import { PageHeaderWrapper } from '@ant-design/pro-layout';
  import { connect } from 'dva';
  import moment from 'moment';
  import CreateForm from './components/CreateUser';
  import ConfigForm from './components/ConfigUser';
  import StandardTable from '@/newcomponents/StandardTable';

	import styles from '@/pages/list/table-list/style.less';

	import { getItemBykey } from '@/utils/tools';

  const FormItem = Form.Item;
  const { Option } = Select;

  const getValue = obj =>
    Object.keys(obj)
      .map(key => obj[key])
      .join(',');

  /* eslint react/no-multi-comp:0 */
  @connect(({ users, loading }) => ({
    users,
    loading: loading.global,
  }))
  class UsersList extends Component {
    state = {
			modalVisible: false,
			current: null,

			imgloading: false,
			imageUrl: '',

			configVisible: false,
			currentconfig: null,

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
        title: '用户名',
				dataIndex: 'username',
      },
      {
        title: '姓名',
				dataIndex: 'tname',
      },
      {
        title: '性别',
				dataIndex: 'sex',
				render(val) { return val ? (val == 'man' ? '男' : '女') : '-' },
			},
			// {
			// 	title: '地址',
			// 	dataIndex: 'address',
			// 	render(val) { return val ? val : '-' },
			// },
			{
				title: '手机',
				dataIndex: 'telephone',
				render(val) { return val ? val : '-' },
			},
      {
        title: '操作',
        render: (rowitem) => (
          <Fragment>
						<a onClick={() => this.buttonConfig(rowitem)}>角色配置</a>
						<Divider type="vertical" />
						<a onClick={() => this.buttonEdit(rowitem)}>编辑</a>
						<Divider type="vertical" />
						<a onClick={() => this.buttonDelete(rowitem)}>删除</a>
          </Fragment>
        ),
      },
    ];

    componentDidMount() {
      this.initData();
      this.props.dispatch({
				type:'users/getDepartment',
				payload:{
					parentid: -1
				}
			})
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
				type: 'users/fetch',
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
				title: '删除用户',
				content: '确定删除该用户吗？',
				okText: '确认',
				cancelText: '取消',
				onOk: () => this.deleteById(rowitem.id),
			});
		};
		buttonDeleteAll = () => {
			Modal.confirm({
				title: '删除用户',
				content: '确定删除选择的所有用户么？',
				okText: '确认',
				cancelText: '取消',
				onOk: () => this.deleteByIds(),
			});
		};
		deleteById = (id) => {
			const { dispatch } = this.props;
			dispatch({
				type: 'users/deleteUser',
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
				type: 'users/deleteUsers',
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
				type: 'users/detailUser',
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
		buttonConfig = (rowitem) => {
			const { dispatch } = this.props;
			//先从服务器更新最新数据
			dispatch({
				type: 'users/getRoles',
				payload: {
					id: rowitem.id
				},
				callback: (item) => {
					this.setState({
						configVisible: true,
						currentconfig: item,
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
					if(!values[key]){
						delete values[key];
					}else{
						let newkey = key.slice(7);
						values[newkey] = values[key];
						delete values[key];
					}
				};
        this.initData(values,'search');
      });
    };

    handleModalVisible = flag => {
      this.setState({
				current: null,
				modalVisible: !!flag,
				imgloading: false,
				imageUrl: '',
      });
		};
		handleconfigVisible = flag => {
			this.setState({
				currentconfig: null,
				configVisible: !!flag,
			});
		};
		handleImgloading = (flag, imageUrl) => {
			this.setState({
				imgloading: !!flag,
				imageUrl: imageUrl ? imageUrl : ''
			});
		}

    handleAdd = fields => {
			const { dispatch } = this.props;
			for(let key in fields){
				typeof(fields[key]) != 'number' && !fields[key] && delete fields[key];
			};
      dispatch({
        type: 'users/addUser',
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
        type: 'users/updateUser',
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
		configUpdate = fields => {
			const { dispatch } = this.props;
			dispatch({
				type: 'users/setRoles',
				payload: fields,
				callback: {
					callbacksuccess: () => {
						message.success('配置成功');
						this.handleconfigVisible();
					},
					callbackfail: () => {
						message.error('配置失败');
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
              <FormItem label="用户名">
                {getFieldDecorator('search-username')(<Input placeholder="请输入用户名" />)}
              </FormItem>
            </Col>
            <Col sm={24} md={12} lg={8} xl={6} >
              <FormItem label="姓名">
                {getFieldDecorator('search-tname')(<Input placeholder="请输入姓名" />)}
              </FormItem>
            </Col>
						<Col sm={24} md={12} lg={8} xl={6} >
              <FormItem label="手机">
                {getFieldDecorator('search-telephone')(<Input placeholder="请输入手机" />)}
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
        users: { data },
        loading,
      } = this.props;
      const { selectedRows, modalVisible, current, imgloading, imageUrl, configVisible, currentconfig } = this.state;

      const parentMethods = {
        handleAdd: this.handleAdd,
				handleUpdate: this.handleUpdate,
        handleModalVisible: this.handleModalVisible,
				handleImgloading: this.handleImgloading,
      };
			const parentMethodsconfig = {
				configUpdate: this.configUpdate,
				handleconfigVisible: this.handleconfigVisible
			};
      return (
        <PageHeaderWrapper title="用户管理">
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
          <CreateForm {...parentMethods} modalVisible={modalVisible} current={current} loading={imgloading} imageUrl={imageUrl}  departmentTree={this.props.users.departmentTree} dispatch={this.props.dispatch}/>
          <ConfigForm {...parentMethodsconfig} configVisible={configVisible} currentconfig={currentconfig}/>
        </PageHeaderWrapper>
      );
    }
  }

  export default Form.create()(UsersList);
