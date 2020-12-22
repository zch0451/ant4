import {Table, Input, InputNumber, Popconfirm, Form, Button, Divider} from 'antd';
import React, {Fragment} from "react";

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputype === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    let data=props.dataSource;
    this.state = { data, editingKey: '',count:data.length };
    this.columns = props.columns?[...props.columns,{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确认取消吗?" onConfirm={() => this.cancel(record.key)}>
                <a>取消</a>
              </Popconfirm>
            </span>
        ) : (
          <span>
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            编辑
            </a>
            <Divider type="vertical" />
             <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record)}>
                  <a disabled={editingKey !== ''}>
                    删除
                  </a>
             </Popconfirm>
          </span>


        );
      },
    }]:[]
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if(JSON.stringify(this.props.dataSource)==JSON.stringify(nextProps.dataSource)){
      return false
    }else{
      let data=nextProps.dataSource;
      this.setState({
        data,
        count:data.length
      })
    }
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };
  handleAdd = () => {
    const { count, data } = this.state;
    let newData = {key:data.length,index:data.length+1};
    if(this.props.constObj){
      newData={
        ...newData,
        ...this.props.constObj
      }
    }
    this.setState({
      data: [...data, newData],
      count: count + 1,
    });
  };
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
        if(newData[index].id){
          debugger;
          this.props.updateRow(newData[index]);
        }else{
          this.props.addRow(newData[index])
        }

      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
        this.props.addRow(row)
      }

    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }
  handleDelete = row => {
    let key=row.key;
    const data = [...this.state.data];
    let count=this.state.count-1;
    this.setState({ data: data.filter(item => item.key !== key),count});
    this.props.deleteRow(row);
  };
  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          添加行
        </Button>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);
export default  EditableFormTable
