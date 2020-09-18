import React,{ Component } from 'react'
import { Card,Popconfirm } from 'antd'
import { EditOutlined,DeleteOutlined,LoadingOutlined } from '@ant-design/icons'
import Style from '../styles/Card/CardStyle.module.css'
import openNotificationWithIcon from './Notif'
import DrawerEdit from '../components/DrawerEdit/DrawerEdit';
import Axios from 'axios'
import { connect } from 'react-redux'
import { deleteBook } from '../redux/actions/admin'

class CardBook extends Component {
    constructor(props){
        super(props)
        this.state ={
            deleteLoading : false,
            visible : false
        }
    }
    //slice 
    handleslice = (msg) =>{
        this.props.onDelete(this.props.i)
    }
    cancel = () =>{

    }
    confirm = () =>{

    }
    //deleteBook
    handleOnDelete = (id)=>()=>{
        let data = {
            id : id,
            token : this.props.auth.auth.token,
            index : this.props.i
        }
        this.props.deleteBook(data).then((res)=>{
            if(res.value.data.success){
                openNotificationWithIcon('success','success',res.value.data.msg)
            }
            else{
                openNotificationWithIcon('error','error',res.value.data.msg)
            }
        })
      }
    render() {
        const { Meta } = Card;
        return (
            <div className={`${Style.cardBook}`} onClick={(e)=>{
                e.target.className === 'detail'?
                this.props.history.push(`/details/page/${this.props.data.id}`) : console.log()
            }}>
            <Card
            className='detail'
            hoverable
            style={{ width: 230,overflow: 'hidden'}}
            cover={<img alt="Picture" src={`${process.env.REACT_APP_URL_API}uploads/${this.props.data.image}`} className='detail'/>}>
                <div className={`${Style.float} ${Style.edit}`} onClick={(e)=>{this.setState({visible : true})}}>
                    <DrawerEdit visible={this.state.visible} id={this.props.data.id}/>
                </div>
                <Popconfirm
                    title="Are You sure to delete This ?"
                    onConfirm={this.handleOnDelete(this.props.data.id)}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                >
                <div className={`${Style.float} ${Style.delete}`} >
                    {this.state.deleteLoading? <LoadingOutlined/> : <DeleteOutlined/>}
                </div>
                </Popconfirm>
            <Meta title={this.props.data.title} description={this.props.data.desc} />
          </Card>
          </div>
        )
    }
}
const mapStateToProps = state =>({
    auth : state.auth,
    admin : state.admin
})
const mapDispatchToProps = { deleteBook }
export default connect(mapStateToProps,mapDispatchToProps)(CardBook)