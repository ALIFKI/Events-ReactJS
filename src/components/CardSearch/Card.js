import React,{ Component } from 'react'
import { Card } from 'antd'
import { EditOutlined,DeleteOutlined,LoadingOutlined } from '@ant-design/icons'
import openNotificationWithIcon from '../Notif'
import Style from './CardStyle.module.css'
import Axios from 'axios'
//cardSearch
class CardSearch extends Component {
    constructor(props){
        super(props)
        this.state ={
            title : 'Ubur Ubur Lembur',
            desc : 'Lorem Ipsum',
            deleteLoading : false
        }
    }
    //slice 
    handleslice = (msg) =>{
        this.props.onDelete(this.props.i)
    }
    //deleteBook
    handleOnDelete = (id)=>()=>{
        this.setState({
          deleteLoading : true
        })
        Axios({
            method : 'DELETE',
            url : `${process.env.REACT_APP_URL_API}api/books/`+id,
            headers : {
                Authorization : localStorage.getItem('token')
            }
        }).then(
            (res)=>{
                openNotificationWithIcon('success','success',res.data.msg)
        }).catch((err)=>{
            // console.log(err)
        }).finally(     
            this.props.onDelete(this.props.i)
        )
      }
    render() {
        const { Meta } = Card;
        return (
            <div className={`${Style.cardBook}`} onClick={(e)=>{
                e.target.className === 'detail'?
                this.props.history.push(`/details/page/${this.props.data.id}`) : console.log('res')
            }}>
            <Card
            className='detail'
            hoverable
            style={{ width: 230,overflow: 'hidden'}}
            cover={<img alt="Picture" src={`${process.env.REACT_APP_URL_API}uploads/${this.props.data.image}`} className='detail'/>}>
            <Meta title={this.props.data.title} description={this.props.data.desc} />
          </Card>
          </div>
        )
    }
}

export default CardSearch