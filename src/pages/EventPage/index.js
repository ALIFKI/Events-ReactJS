import React,{ Component } from 'react'
import { Container,Table } from 'reactstrap';
import Style from './Style.module.css'
import { Pagination,Input, Row } from 'antd';
import InputLogin from '../../components/Input';
import { getEvents } from '../../redux/actions/admin'
import {connect} from 'react-redux';
import NavbarComponent from '../../components/Navbar';
import DrawerInput from '../../components/DrawerInput/DrawerInput';
import { SearchOutlined } from '@ant-design/icons'
import Moment from 'react-moment';


const { Search } = Input

class EventsPage extends Component {
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
        if(this.props.data.event == null){
          this.getData()
        }
    }

    onChange = page => {
        let data = {
            search : this.Search.current.state.data,
            page : page,
            order : this.state.order,
            sort  : this.state.sort,
            by : this.state.by,
            limit : 5
          }
          this.props.getEvents(data).then((res)=>{
            console.log(res.value.data.pageInfo)
          }).catch((err)=>{
            console.log(err)
          })
        this.setState({
            current : page,
            page : page
        })
      };
    onSearch = ()=>{
        let data = {
            search : this.Search.current.state.data,
            page : this.state.page,
            order : this.state.order,
            sort  : this.state.sort,
            by : this.state.by,
            limit : 5
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
        this.setState({
            search : this.Search.current.state.data
        })
    }
    getData = ()=>{
        let data = {
          search : '',
          page : this.state.page,
          order : this.state.order,
          sort  : this.state.sort,
          by : this.state.by,
          limit : 5
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
            <Container fluid={true}>
              <Row>
                <NavbarComponent/>
              </Row>
              <div className={`row d-flex flex-row align-items-center justify-content-center p-5`}>
                <div className='col-md-6 col-lg-12 pt-5'>
                <div className={`row d-flex flex-row align-items-center justify-content-center mb-4`}>
                    <div className={`${Style.srchIn}`}>
                      <InputLogin name={'Search'} required={true} placeholder={'Email'} type={'text'} value={this.state.search} ref={this.Search}/>
                    </div>
                    <div className={`${Style.button}`} onClick={this.onSearch}>
                        <SearchOutlined color={'white'}/>
                    </div>
                </div>
                <Table striped bordered hover variant="dark" responsive>
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Participant</th>
                        <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.events.map((row,index)=>{
                                return  <tr key={index}>
                                        <td>{row.id}</td>
                                        <td> {row.title} </td>
                                        <td> {row.location} </td>
                                        <td> <Moment format="YYYY/MM/DD" date={row.date} /> </td>
                                        <td> {row.participan} </td>
                                        <td> {row.note} </td>
                                        </tr>
                            })
                        }
                    </tbody>
                </Table>
                {pagination}
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

export default connect(mapStateToProps,mapDispatchToProps)(EventsPage)