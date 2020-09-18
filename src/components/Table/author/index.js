import React,{ useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { connect } from 'react-redux';
import openNotificationWithIcon from '../../Notif';
import MyModalAuthor from '../../Modal/author';
import { getAuthor, deleteAuthor, editAuthor } from '../../../redux/actions/author';
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTableAuthor extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.columns = [
      {
        title: 'Author',
        dataIndex: 'author',
        editable: true,
      },
      {
        title: 'actions',
        dataIndex: 'operation',
        render: (text, record) =>
          this.props.author.author.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id_author)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
      ],
    };
  }

  componentDidMount(){
    let data = {
      token : this.props.auth.auth.token
    }
    this.props.getAuthor(data)
  }

  handleDelete = key => {
    let data = {
      id : key,
      token : this.props.auth.auth.token 
    }
    this.props.deleteAuthor(data).then((res)=>{
      // console.log(res.value)
      openNotificationWithIcon('success','Success!',res.value.data.msg)
    })
  };

  handleSave = row => {
    // const newData = [...this.state.dataSource];
    // const index = newData.findIndex(item => row.key === item.key);
    // const item = newData[index];
    // newData.splice(index, 1, { ...item, ...row });
    // this.setState({
    //   dataSource: newData,
    // });
    let data = {
      ...row,
      token : this.props.auth.auth.token
    }
    this.props.editAuthor(data).then((res)=>{
      // console.log(res)
      openNotificationWithIcon('success','Success!!',res.value.data.msg)
    }).catch((err)=>{
      // console.log(err.response)
    })
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
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
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div style={{margin: "10px 30px"}}>
        {/* <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button> */}
        <MyModalAuthor/>
        <Table
          
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={this.props.author.author}
          columns={columns}
        />
      </div>
    );
  }
}

const mapStateToProps = state =>({
  auth : state.auth,
  author : state.author
})
const mapDispatchToProps = {
  getAuthor,
  deleteAuthor,
  editAuthor
}
export default connect(mapStateToProps,mapDispatchToProps)(EditableTableAuthor)
