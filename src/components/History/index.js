import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import { Table, Tag, Space } from 'antd';
import { connect } from 'react-redux';
import { getTransaction, returnBook } from '../../redux/actions/history';
import openNotificationWithIcon from '../Notif';


class History extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 modal2Visible : false
        }
        console.log(props)
    }
    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
      }
    
      setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
      }
      handleReturn =(id)=>()=>{
        let data = {
          token : this.props.auth.auth.token
        }
        this.props.returnBook(data,id).then((res)=>{
          console.log(res)
          let data = {
            id : this.props.auth.auth.id,
            token : this.props.auth.auth.token
          }
          this.props.getTransaction(data)
          openNotificationWithIcon('success','Success!!',res.value.data.msg)
        }).catch((err)=>{
          openNotificationWithIcon('error','error',err.response.data.msg)
        })
      }
    columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Borrower',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'status',
          key: 'status',
          dataIndex: 'return_date',
          render: return_date => (
            <>
              {
                  return_date !== null ?             
                <Tag color="blue">
                  Returned
                </Tag> : 
                <Tag color="red">
                    Borrowed
                </Tag>
              }
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle" onClick={this.handleReturn(record.id)}>
              <a>Return Books</a>
            </Space>
          ),
        },
      ];

    render() {
        return (
            <div>
                <p onClick={()=>{this.setModal2Visible(true)}}>History</p>
                    <Modal
                    title="History"
                    centered
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                    >
                        <Table columns={this.columns} dataSource={this.props.historyData.history} />
                    </Modal>
            </div>
        )
    }
}
const mapStateToprops = state => ({
    historyData : state.history,
    auth : state.auth,
})
const mapDispatchToProps = {getTransaction,returnBook}
export default connect(mapStateToprops,mapDispatchToProps)(History)
