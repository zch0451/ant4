import { Form, Input, Modal, Icon, Select, Upload, Checkbox, Row, Col } from 'antd';
const { Option } = Select;
import React from 'react';
import { getBase64, beforeUpload, passwordSecret, getAppId, getUploadApi } from '@/utils/tools';

const FormItem = Form.Item;

const ConfigRole = props => {
  const { configVisible, form, configUpdate, handleconfigVisible, currentconfig } = props;

  const formItemLayout = {
    labelCol: {
			span: 5
    },
    wrapperCol: {
			span: 17
    },
	};
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
			delete fieldsValue.username;
      let code = [];
			Object.keys(fieldsValue).map(key => {
				code.push(...fieldsValue[key]);
				delete fieldsValue[key];
			})
			fieldsValue.id = currentconfig.urp_role.id;
			fieldsValue.permits = code.join(',');
			configUpdate(fieldsValue);
    });
	};
	if(!currentconfig) return null;

  return (
    <Modal
      destroyOnClose
			title="权限配置"
			width="800px"
      visible={configVisible}
      onOk={okHandle}
      onCancel={() => handleconfigVisible()}
    >
      <FormItem {...formItemLayout} label="角色名称">
				{form.getFieldDecorator('rolename', {
					initialValue: currentconfig ? currentconfig.urp_role.rolename : null,
				})(<Input disabled />)}
			</FormItem>
			{Object.keys(currentconfig.permitmap).map((key, index) => (
				<FormItem {...formItemLayout} label={key} key={index}>
					{form.getFieldDecorator('key'+key, {
						initialValue: currentconfig.setpermitid.filter(value => {
							let flag = false;
							currentconfig.permitmap[key].map(item => {
								if(item.id == value){
									flag = true;
								}
							})
							return flag;
						}),
					})(
						<Checkbox.Group style={{ width: '100%' }}>
							<Row>
								{
									currentconfig.permitmap[key].map((item) => (
										<Col span={8} key={item.id}>
											<Checkbox value={item.id}>{item.name}</Checkbox>
										</Col>
									))
								}
							</Row>
						</Checkbox.Group>
					)}
				</FormItem>
			))}
    </Modal>
  );
};

export default Form.create()(ConfigRole);
