import React,{ Component } from 'react'
import InputStyle from '../styles/InputStyle.module.css'
import openNotificationWithIcon from './Notif'

class InputLogin extends Component {
    constructor(props){
        super(props)
        this.state={
            data : '',
            image : []
        }
    }
    componentWillMount(){
        this.setState({
            data : this.props.value
        })
    }
    reset = ()=>{
            this.setState({
                data : ''
            })
    }
    resetImage = ()=>{
        this.setState({
            image : []
        })
    }
    componentDidMount(){

    }
    validImage = (e)=>{
        console.log(e[0].size)
        if (!e[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
            openNotificationWithIcon('error','Invalid Image!!','Please Use Image jpg/jpeg/png ')
            return false;
        }
        if(e[0].size >=2000000){
            openNotificationWithIcon('error','Invalid Image!!','file size no more 2mb')
        }
    }
    render(){
        let input
        if(this.props.type === 'file'){
            input = <input type={this.props.type} required={this.props.required ? 'required' : ''} onChange={(e)=>{this.setState({image : e.target.files});this.validImage(e.target.files)}} className={InputStyle.input}/>
        }
        else{
            input = <input type={this.props.type} required={this.props.required ? 'required' : ''} onChange={(e)=>{this.setState({data : e.target.value})}} className={InputStyle.input} value={this.state.data}/>
        }
        return(
            
            <div className={InputStyle.group}>
                    {input}<span className={InputStyle.highlight}></span><span className={InputStyle.bar} ref="stepOneName"></span>
                <label className={InputStyle.label}>{this.props.name}</label>
            </div>
        )
    }
}

export default InputLogin