import { Drawer, Space,Avatar,Input,Select,Upload,notification } from 'antd';
import React,{ Component } from 'react'
import { Form,Button } from 'reactstrap';
import Style from "./DrawerInputStyle.module.css";
import InputLogin from '../Input';
import {
EditOutlined
} from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import Axios from 'axios';
import openNotificationWithIcon from '../Notif' 
import { connect } from 'react-redux';
import { editBook,getBook } from '../../redux/actions/admin';
const { Option } = Select;

class DrawerEdit extends Component {
    constructor(props,refs){
        super(props,refs)
        this.state = { 
          data : {
            author : [],
            genre : []
          },
          book : {},
          visible: false, 
          placement: 'right',
          active : '',
          content : '',
          title : '',
          image : '',
          genre : '',
          author : '',
          status : '',
       };
       //get Ref from Child Component
       this.textInput = React.createRef();
       this.image = React.createRef();
    }
    componentDidMount(){
      this.getAllAuthor();
      this.getAllGenre();
      this.getData()
    }

    getData = ()=>{
      Axios({
        method : 'GET',
        headers: {
          Authorization : this.props.auth.auth.token
        },
        url : `${process.env.REACT_APP_URL_API}api/books/${this.props.id}`
      }).then((res)=>{
        this.setState({
          book : res.data.data,
          author : res.data.data.id_author,
          genre : res.data.data.id_genre,
          content : res.data.data.description,
          status : res.data.data.status
        })
        // console.log(res)
      }).catch((err)=>{
        // console.log(err)
      })
    }

    getAllAuthor = ()=>{
      Axios({
        method : 'GET',
        url : `${process.env.REACT_APP_URL_API}api/authors?search=&limit=200&page=1&sort=0&by=author`,
        headers : {
          Authorization : this.props.auth.auth.token
      },
      }).then((res)=>{
        this.setState({
          data : {
            ...this.state.data,
            author : res.data.data
          }
        })
      }).catch((err)=>{
        // console.log(err)
      }).finally(
      )
    }
    getAllGenre = ()=>{
      Axios({
        method : 'GET',
        url : `${process.env.REACT_APP_URL_API}api/genres?search=&page=1&limit=10&sort=0&by=genre`,
        headers : {
          Authorization : this.props.auth.auth.token
      },
      }).then((res)=>{
        this.setState({
          data : {
            ...this.state.data,
            genre : res.data.data
          }
        })
      }).catch((err)=>{
        // console.log(err)
      }).finally(
      )
    }
    showDrawer = () => {
      this.setState({
        visible: true,
        active : 'is-active'
      });
    };

    onClose = () => {
      this.setState({
        visible: false,
        active : ''
      });
    };

    onChange = e => {
      this.setState({
        placement: e.target.value,
      });
    };
    //genreSelect
    handleGenreOnChange = (e)=>{
      this.setState({
        genre : e
      })
    }
    //status
    handleStatusOnChange = (e)=>{
      this.setState({
        status : e
      })
    }
    //authorSelect
    handleAuthorOnChange = (e)=>{
      this.setState({
        author : e
      })
    }
    //handel Tiny mCe change
    handleEditorChange = (content,editor)=>{
        this.setState({
            content : content
        })
    }
    //handel Form submit
    handleOnsubmit = (event) =>{
      event.preventDefault();
      const formData = new FormData()
      if (this.image.current.state.image[0] == undefined) {
        // console.log('No image')
      }
      else{
        formData.append('image',this.image.current.state.image[0]);
      }
      formData.append('title',this.textInput.current.state.data);
      formData.append('id_genre',this.state.genre);
      formData.append('id_author',this.state.author);
      formData.append('description',this.state.content);
      formData.append('status',this.state.status)

      let data = {
        id : this.props.id,
        formData : formData,
        token : this.props.auth.auth.token
      }
      this.props.editBook(data).then((res)=>{
        // console.log(res.value)
        openNotificationWithIcon('success','Success!',res.value.data.msg)
          this.setState({
            visible : false
          })
          this.props.getBook(this.props.auth.auth.token)
      }).catch((err)=>{
        // console.log(err.response)
      })

    }

  render() {
    const { placement, visible } = this.state;
    return (
      <>
        <Space>
            <EditOutlined style={{fontSize: '20px'}} onClick={this.showDrawer}/>
        </Space>
        <Drawer
          width={400}
          placement={placement}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}
          // maskStyle={{opacity:0,backgroundColor: 'rgba(0, 0, 0, 0.0)'}}
        >
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h3>Edit Book</h3>
                <Form onSubmit={this.handleOnsubmit}>
                <InputLogin name={'title'} required={true} placeholder={'Title Book'} type={'text'} value={this.state.book.title} ref={this.textInput}/>
                <label>Descriptions</label>
                <Editor
                    apiKey = '9p428y16wndt918ysp9mhdxaxxba0vn0ho2o7wzv3otznk5i'
                    initialValue={this.state.book.description}
                    init={{
                    width: 340,
                    height: 200,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={this.handleEditorChange}
                />
                    <Input.Group compact>
                        <label>Genre</label>
                        <Select onChange={this.handleGenreOnChange} optionFilterProp="children" defaultValue={this.state.book.genre} style={{width:'100%'}}>
                          {this.state.data.genre.map((res)=>{
                            return <Option key={res.id_genre} value={res.id_genre}>{res.genre}</Option>
                          })}
                        </Select>
                    </Input.Group>
                    <Input.Group compact>
                        <label>Status</label>
                        <Select onChange={this.handleStatusOnChange} optionFilterProp="children" defaultValue={this.state.book.status} style={{width:'100%'}}>
                          <Option value='Available'>Available</Option>
                          <Option value='Unavailable'>Unavailable</Option>
                        </Select>
                    </Input.Group>
                    <Input.Group compact>
                        <label>Author</label>
                        <Select
                          showSearch
                          defaultValue={this.state.book.author}
                          style={{ width: '100%' }}
                          placeholder="Select a Author"
                          optionFilterProp="children"
                          onChange={this.handleAuthorOnChange}
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {
                            this.state.data.author.map((res)=>{
                            return <Option key={res.id_author} value={res.id_author}>{res.author}</Option>
                            })
                          }
                        </Select>
                    </Input.Group>
                        
                  <InputLogin name={'Cover'} required={false} placeholder={''} type={'file'} value={''} ref={this.image} />
                <Button className={`btn right-btn ${Style.btnLogin} ${Style.fP}`} type='submit' style={{backgroundColor: 'black'}}>Edit</Button>
                </Form>

            </div>
        </Drawer>
      </>
    );
  }
}
const mapStateToProps = state=>({
  auth : state.auth,
  book : state.book
})

const mapDispatchToProps = {editBook,getBook}



export default connect(mapStateToProps,mapDispatchToProps)(DrawerEdit)
