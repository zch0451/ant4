import { Upload, Icon, message } from 'antd';
import React from 'react';
import {getApi,getUploadApi} from '@/utils/tools'
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('请上传jpg或png格式的图片');
  }
  return isJpgOrPng;
}

class Avatar extends React.Component {
  constructor(props){
    super(props);
    let _setting={
      name:'file',
      action:'',
      loading:false,
      headers: {
        authorization:localStorage.getItem('antd-pro-token')
      }
    }
    let setting=Object.assign(_setting,props);
    setting.action=setting.action||getUploadApi();
    this.state={
      ...setting
    }
    this.handleChange=this.handleChange.bind(this)
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
      if(this.state.callback){
        this.state.callback(info.file.response);
      }
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const { imageUrl,action,name} = this.state;
    return (
      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={action}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default Avatar;
