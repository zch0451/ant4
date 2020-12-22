import { Upload, message, Button, Icon } from 'antd';
import React, { PureComponent, Fragment } from 'react';
import {getApi,getUploadApi} from '@/utils/tools'
class UploadFile extends  React.Component{
    constructor(props){
        super(props);
        let _setting={
            name:'file',
            action:'',
            headers: {
                authorization:localStorage.getItem('antd-pro-token')
            }
        }
        let setting=Object.assign(_setting,props);
        if(setting.action){
            setting.action=setting.action
        }else{
            getUploadApi().then(uploadApi=>{
                setting.action=uploadApi;
                this.setState({
                    action:uploadApi
                })
            })
        }
        this.state={
            ...setting
        }
        this.onRemove=this.onRemove.bind(this)
    }
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {

                message.success(`${info.file.name} 上传成功`);
                if(this.state.callback){
                    this.state.callback(info.file.response);
                }
                info.file.fileList=[];

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    }
    onRemove(info){
        if(this.state.remove){
            this.state.remove(info.response);
        }

    }
    render() {
        return (
            <Upload {...this.state} onChange={this.onChange.bind(this)} onRemove={this.onRemove}>
                <Button>
                    <Icon type="upload"/> {this.state.text||'导入'}
                </Button>
                <div>
                    <sub>{this.state.notice?this.state.notice:null}</sub>
                </div>
            </Upload>
        )
    }
}

export default UploadFile
