import { Form, Input, Modal, Icon, Select, Upload, Switch } from 'antd';
const { Option } = Select;
import React from 'react';

const FormItem = Form.Item;

const CreatePermitGroup = props => {
  const { modalVisible, form, handleAdd, handleUpdate, handleModalVisible, current } = props;
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
			title={current ? "编辑权限组" : "新建权限组"}
			visible={modalVisible}
			onOk={okHandle}
			onCancel={() => handleModalVisible()}
		>
			<FormItem {...formItemLayout} label="权限组名称">
				{getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入权限组名称' }],
					initialValue: current ? current.name : undefined,
				})(<Input placeholder="请输入权限组名称" />)}
			</FormItem>
			<FormItem {...formItemLayout} label="开启状态">
				{form.getFieldDecorator('isopen', {
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

export default Form.create()(CreatePermitGroup);
