import { Form, Input, Modal, Icon, Select, Upload, Checkbox, Row, Col } from 'antd';
const { Option } = Select;
import React from 'react';
import { getBase64, beforeUpload, passwordSecret, getAppId, getUploadApi } from '@/utils/tools';

const FormItem = Form.Item;

const ConfigUser = props => {
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
			fieldsValue.id = currentconfig.urp_user.id;
			fieldsValue.roleids = code.join(',');
			configUpdate(fieldsValue);
    });
	};
	if(!currentconfig) return null;

  return (
    <Modal
      destroyOnClose
      width={800}
      title="角色配置"
      visible={configVisible}
      onOk={okHandle}
      onCancel={() => handleconfigVisible()}
    >
      <FormItem {...formItemLayout} label="用户名">
				{form.getFieldDecorator('username', {
					initialValue: currentconfig ? currentconfig.urp_user.username : null,
				})(<Input disabled />)}
			</FormItem>
			{Object.keys(currentconfig.rolemap).map((key, index) => (
				<FormItem {...formItemLayout} label={key} key={index}>
					{form.getFieldDecorator('key'+key, {
						initialValue: currentconfig.setroleid.filter(value => {
							let flag = false;
							currentconfig.rolemap[key].map(item => {
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
									currentconfig.rolemap[key].map((item) => (
										<Col span={8} key={item.id}>
											<Checkbox value={item.id}>{item.rolename}</Checkbox>
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

export default Form.create()(ConfigUser);
