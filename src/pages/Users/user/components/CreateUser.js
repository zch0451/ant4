import { Form, Input, Modal, Icon, Select, Upload,TreeSelect,Tree } from 'antd';
const {TreeNode} =TreeSelect;
const { Option } = Select;
import React from 'react';
import { getBase64, beforeUpload, passwordSecret, getAppId, getUploadApi } from '@/utils/tools';
import {connect} from "dva";

const FormItem = Form.Item;
class CreateUser extends React.Component{
	render(){
		const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, current, handleImgloading, imageUrl, loading,departmentTree,dispatch } = this.props;

		const formItemLayout = {
			labelCol: {
				span: 7
			},
			wrapperCol: {
				span: 15
			},
		};
		const okHandle = () => {
			form.validateFields((err, fieldsValue) => {
				if (err) return;
				form.resetFields();
				if (current) {
					fieldsValue.id = current.id;
					fieldsValue.appId = getAppId();
					if(fieldsValue.password != current.password){
						fieldsValue.editpwd = '1';
						fieldsValue.password = passwordSecret(fieldsValue.password);
					}else{
						fieldsValue.editpwd = '0';
						delete fieldsValue.password;
					}
					handleUpdate(fieldsValue);
				}else{
					fieldsValue.appId = getAppId();
					fieldsValue.password = passwordSecret(fieldsValue.password);
					handleAdd(fieldsValue);
				}
			});
		};
		const uploadButton = (
			<div>
				<Icon type={loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">上传</div>
			</div>
		);
		const handleChange = info => {
			if (info.file.status === 'uploading') {
				handleImgloading(true);
				return;
			}
			if (info.file.status === 'error') {
				handleImgloading(false);
				return;
			}
			if (info.file.status === 'done') {
				getBase64(info.file.originFileObj, imageUrl => {
					handleImgloading(false, imageUrl);
				});
				form.setFieldsValue({
					"picture": info.file.response[info.file.response.length - 1].fileUrl
				});
			}
		};

		const onSelect = (value, node) => {
			form.setFieldsValue({'departmentid':node.props.dataRef.id});
		}
		const onLoadData = treeNode =>{
			console.log(treeNode);
			return new Promise(resolve => {
				if (treeNode.props.dataRef.children && treeNode.props.dataRef.children.length) {
					resolve();
					return;
				}
				dispatch({
					type: 'users/getDepartment',
					payload: {
						parentid: treeNode.props.dataRef.id
					},
					callback: () => resolve()
				});
			});
		}

		const renderTreeNodes = data =>
			data.map(item => {
				if (item.children) {
					return (
						<TreeNode
							title={item.title}
							key={item.key}
							value={item.key}
							dataRef={item}>
							{renderTreeNodes(item.children)}
						</TreeNode>
					);
				}
				return  <TreeNode
					title={item.title}
					isLeaf={item.isLeaf}
					key={item.key}
					value={item.key}
					dataRef={item} />;
			});

		return (
			<Modal
				destroyOnClose
				title={current ? "编辑用户" : "新建用户"}
				visible={modalVisible}
				onOk={okHandle}
				onCancel={() => handleModalVisible()}
			>
				<FormItem {...formItemLayout} label="所属部门">
					{form.getFieldDecorator('departmentid', {
						rules: [{ required: true, message: '请选择所属部门' }],
						initialValue: current ? current.departmentid : null,
					})(<Input type="hidden" />)}
					<TreeSelect
						style={{ width: '100%' }}
						dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						placeholder={current ? (current.departmentname ? current.departmentname : '未选择') : "请选择所属部门"}
						loadData={onLoadData}
						onSelect={onSelect}
					>
						{renderTreeNodes(departmentTree)}
					</TreeSelect>
				</FormItem>
				<FormItem {...formItemLayout} label="用户名">
					{form.getFieldDecorator('username', {
						rules: [{ required: true, message: '请输入用户名' }],
						initialValue: current ? current.username : null,
					})(<Input placeholder="请输入用户名" />)}
				</FormItem>
				<FormItem {...formItemLayout} label="密码">
					{form.getFieldDecorator('password', {
						rules: [{ required: true, message: '请输入密码' }],
						initialValue: current ? current.password : null,
					})(<Input type="password" placeholder="请输入密码" />)}
				</FormItem>
				<FormItem {...formItemLayout} label="真实姓名">
					{form.getFieldDecorator('tname', {
						rules: [{ required: true, message: '请输入真实姓名' }],
						initialValue: current ? current.tname : null,
					})(<Input placeholder="请输入真实姓名" />)}
				</FormItem>
				<FormItem {...formItemLayout} label="性别">
					{form.getFieldDecorator('sex',{
						initialValue: current && current.sex ? current.sex : null
					})(<Select style={{ width: '100%' }}>
						<Option value="man">男</Option>
						<Option value="woman">女</Option>
					</Select>)}
				</FormItem>
				<FormItem {...formItemLayout} label="手机号码">
					{form.getFieldDecorator('telephone',{
						initialValue: current ? current.telephone : null
					})(<Input placeholder="可输入手机号码" />)}
				</FormItem>
				<FormItem {...formItemLayout} label="邮箱">
					{form.getFieldDecorator('email',{
						initialValue: current ? current.email : null
					})(<Input placeholder="可输入邮箱" />)}
				</FormItem>
				<FormItem {...formItemLayout} label="头像">
					<Upload
						name="avatar"
						className="avatar-uploader"
						showUploadList={ false }
						listType="picture-card"
						action={getUploadApi()}
						beforeUpload={ beforeUpload }
						onChange={ handleChange }
					>
						{current && !imageUrl && current.picture ? <img style={{width: '80px', height: '80px'}} src={current.picture} alt="avatar" /> : (
							imageUrl ? <img style={{width: '80px', height: '80px'}} src={imageUrl} alt="avatar" /> : uploadButton
						)}
					</Upload>
					{form.getFieldDecorator('picture')(
						<Input type="hidden" />
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="排序码">
					{form.getFieldDecorator('sortcode',{
						initialValue: current ? current.sortcode : null
					})(<Input type="number" placeholder="可输入排序码" />)}
				</FormItem>
				<FormItem {...formItemLayout} label="备注">
					{form.getFieldDecorator('remark',{
						initialValue: current ? current.remark : null
					})(<Input placeholder="可输入备注" />)}
				</FormItem>
			</Modal>
		);
	}
}

export default Form.create()(CreateUser);
