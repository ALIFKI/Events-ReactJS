import React,{ Component } from 'react'
import { Container,Table } from 'reactstrap';
import Style from './Style.module.css'
import { Link, Redirect } from 'react-router-dom'
import Logo from '../../images/bookshelf.png'
import { Pagination,Input } from 'antd';
import Card from '../../components/CardBook/index';
import InputLogin from '../../components/Input';
import { getEvents } from '../../redux/actions/admin'
import {connect} from 'react-redux';
import openNotificationWithIcon from '../../components/Notif'
import image from '../../images/undraw_authentication_fsn5.svg'
import NavbarComponent from '../../components/Navbar';
import DrawerInput from '../../components/DrawerInput/DrawerInput';
import { EditOutlined,DeleteOutlined,LoadingOutlined,SearchOutlined } from '@ant-design/icons'
import CardList from '../../components/CardBook/index';

const { Search } = Input

class EventsList extends Component {
    constructor(props,refs){
        super(props,refs)
        this.state = {
          isLoading : false,
          by : 'title',
          sort : 0,
          order : 'id',
          search : '',
          totalPage : 1,
          total_data : 0,
          current : 1,
          limit : 5,
          page : 1,
        }
        //get Ref From Child input
        this.Search = React.createRef();
        this.passwordInput = React.createRef()
    }
    componentDidMount(){
        this.getData()
    }
    getData = ()=>{
        let data = {
          search : '',
          page : this.state.page,
          order : this.state.order,
          sort  : this.state.sort,
          by : this.state.by,
          limit : 100
        }
        this.props.getEvents(data).then((res)=>{
          console.log(res.value.data.pageInfo)
          this.setState({
            totalPage: res.value.data.pageInfo.total_page,
            total_data : res.value.data.data.length*res.value.data.pageInfo.total_page
            })
        }).catch((err)=>{
          console.log(err)
        })
      }
    render(){
        let pagination;
        if (this.state.totalPage>1) {
            pagination = <Pagination current={this.state.current} onChange={this.onChange} total={this.state.total_data} pageSize={this.state.limit} />
        }
        else{
            pagination = <div className="l"></div>
        }
        return(
            <>
        <NavbarComponent/>
            <Container fluid={true}>
              <div className={`row d-flex flex-row align-items-center justify-content-center p-5`}>
                <div className='col-md-6 col-lg-12 pt-5'>
                <div className={`d-flex flex-row align-items-center justify-content-start flex-wrap`}>
                    {
                        this.props.data.events.map((row,index)=>{
                            return <CardList data={row} key={index}/>
                        })
                    }
                </div>
                </div>
              </div>
            </Container>
            </>
        )
}
}
const mapStateToProps = (state)=>(
{
  data : state.admin
}
)

const mapDispatchToProps = {getEvents}

export default connect(mapStateToProps,mapDispatchToProps)(EventsList)