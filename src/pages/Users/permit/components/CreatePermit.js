import { Form, Input, Modal, Icon, Select, Upload ,Switch} from 'antd';
const { Option } = Select;
import React from 'react';

const FormItem = Form.Item;

const CreatePermit = props => {
  const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, current, permitgroup } = props;
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
				fieldsValue.isopen = fieldsValue.isopen ? '1' : '0';
				handleUpdate(fieldsValue);
			}else{
				fieldsValue.isopen = fieldsValue.isopen ? '1' : '0';
				handleAdd(fieldsValue);
			}
		});
	};

  return (
    <Modal
			destroyOnClose
			title={current ? "编辑权限" : "新建权限"}
			visible={modalVisible}
			onOk={okHandle}
			onCancel={() => handleModalVisible()}
		>
			<FormItem {...formItemLayout} label="权限组">
				{getFieldDecorator('category', {
					initialValue: current ? current.category : undefined,
				})(
					<Select style={{ width: '100%' }} placeholder="请选择权限组">
						{
							permitgroup && permitgroup.map((item) => (
								<Option key={item.id} value={item.id}>{item.name}</Option>
							))
						}
					</Select>
				)}
			</FormItem>
			<FormItem {...formItemLayout} label="权限编码">
				{form.getFieldDecorator('code', {
					rules: [{ required: true, message: '请输入权限编码' }],
					initialValue: current ? current.code : null,
				})(<Input placeholder="请输入权限编码" />)}
			</FormItem>
			<FormItem {...formItemLayout} label="权限名称">
				{form.getFieldDecorator('name', {
					rules: [{ required: true, message: '请输入权限名称' }],
					initialValue: current ? current.name : null,
				})(<Input placeholder="请输入权限名称" />)}
			</FormItem>
			<FormItem {...formItemLayout} label="开启状态">
				{getFieldDecorator('isopen',{
					valuePropName: 'checked', initialValue: current ? current.isopen == '1' : false
				})(<Switch checkedChildren="开启" unCheckedChildren="关闭" />)}
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
};

export default Form.create()(CreatePermit);
