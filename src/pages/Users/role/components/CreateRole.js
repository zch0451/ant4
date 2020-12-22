import { Form, Input, Modal, Icon, Select, Upload } from 'antd';
const { Option } = Select;
import React from 'react';

const FormItem = Form.Item;

const CreateRole = props => {
  const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, current, rolegroup } = props;
	const { getFieldDecorator } = form;
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
			if (current) {
				fieldsValue.id = current.id;
				handleUpdate(fieldsValue);
			}else{
				handleAdd(fieldsValue);
			}
		});
	};

  return (
    <Modal
			destroyOnClose
			title={current ? "编辑角色" : "新建角色"}
			visible={modalVisible}
			onOk={okHandle}
			onCancel={() => handleModalVisible()}
		>
			<FormItem {...formItemLayout} label="角色组">
				{getFieldDecorator('category', {
					initialValue: current ? current.category : undefined,
				})(
					<Select style={{ width: '100%' }} placeholder="请选择角色组">
						{
							rolegroup && rolegroup.map((item) => (
								<Option key={item.id} value={item.id}>{item.name}</Option>
							))
						}
					</Select>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label="角色编码">
				{form.getFieldDecorator('code', {
					rules: [{ required: true, message: '请输入角色编码' }],
					initialValue: current ? current.code : null,
				})(<Input placeholder="请输入角色编码" />)}
			</FormItem>
			<FormItem {...formItemLayout} label="角色名称">
				{form.getFieldDecorator('rolename', {
					rules: [{ required: true, message: '请输入角色名称' }],
					initialValue: current ? current.rolename : null,
				})(<Input placeholder="请输入角色名称" />)}
			</FormItem>
			<FormItem {...formItemLayout} label="排序码">
				{form.getFieldDecorator('sortcode',{
					initialValue: current ? current.sortcode : null
				})(<Input type="number" placeholder="可输入排序码" />)}
			</FormItem>
			{/*<FormItem {...formItemLayout} label="备注">*/}
			{/*	{form.getFieldDecorator('remark',{*/}
			{/*		initialValue: current ? current.remark : null*/}
			{/*	})(<Input placeholder="可输入备注" />)}*/}
			{/*</FormItem>*/}
		</Modal>
  );
};

export default Form.create()(CreateRole);
