import {Table, Input, InputNumber, Popconfirm, Form, Button} from 'antd';
import React from "react";

const data = [];
for (let i = 0; i < 2; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber/>;
    }
    return <Input/>;
  };

  renderCell = ({getFieldDecorator}) => {
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
          <Form.Item style={{margin: 0}}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
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
    this.state = {data, editingKey: '', count: data.length};
    this.columns = props.columns ? [...props.columns, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const {editingKey} = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{marginRight: 8}}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>取消</a>
              </Popconfirm>
            </span>
        ) : (
          <span>
              <EditableContext.Consumer>
                <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                  编辑
                </a>
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                  <a disabled={editingKey !== ''}>
                    删除
                  </a>
                </Popconfirm>

              </EditableContext.Consumer>
          </span>
        );
      },
    }] : []
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({editingKey: ''});
  };
  handleAdd = () => {
    const {count, data} = this.state;
    const newData = {};
    this.setState({
      data: [...data, newData],
      count: count + 1,
    });
  };
  handleDelete = key => {
    const data = [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== key) });
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
        this.setState({data: newData, editingKey: ''});
      } else {
        newData.push(row);
        this.setState({data: newData, editingKey: ''});
      }
    });
  }

  edit(key) {
    this.setState({editingKey: key});
  }

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
        <Button onClick={this.handleAdd} type="primary" style={{marginBottom: 16}}>
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
export default EditableFormTable
