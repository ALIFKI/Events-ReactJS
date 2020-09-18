import React,{Component} from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Style from './CarouselStyle.module.css'
import {Button} from 'reactstrap'
import Axios from 'axios';
import { connect } from 'react-redux';
import {getCarousel} from '../../redux/actions/home'

class CarouselLanding extends Component {
    constructor(props){
        super(props)
        this.state = {
            book : []
        }
        // console.log(props)
    }
    getData = ()=>{
        this.props.getCarousel(this.props.auth.auth.token)
    }
    handleOnclick=(id)=>()=>{
        this.props.history.push('/details/page/'+id)
    }
    componentWillMount(){
        this.getData()
    }
    rawMarkup(row){
        // var rawMarkup = row.description.substring(0,100)
        return { __html: row };
    }
    render() {
        const settings = {
            dots: true,
            autoplay: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding :'500px',
            adaptiveHeight: true
        }
        return (
            <div className="container">
            <Slider {...settings}>
                {
                    this.props.carousel.carousel.map((row,index)=>{
                        return <div className='slide-div d-flex flex-row justify-content-end' key={index}>
                        <div className={`${Style.cardBook}`}>
                            <img src={`${process.env.REACT_APP_URL_API}uploads/${row.image}`} alt="" />
                        </div>
                        <div className={`${Style.cardBook } ${Style.blur}`}>
                            <img src={`${process.env.REACT_APP_URL_API}uploads/${row.image}`} alt="" />
                        </div>
                        <div className={`m-1 ${Style.title}`}>
                            <h3 className={`m-2 mt-0`}> {row.title} </h3>
                            <p className={`Desc`}>
                                {/* {row.description.substring(0,100)}... */}
                                <span dangerouslySetInnerHTML={this.rawMarkup(row.description.substring(0,100))} />
                            </p>
                            <Button className={`btn right-btn ${Style.btnLogin} ${Style.fP}`} style={{backgroundColor: 'black'}} onClick={this.handleOnclick(row.id)}>detail</Button>
                        </div>
                    </div>
                    })
                }
            </Slider>
          </div>
        )
    }
}

const mapStateToProps = state =>({
    carousel : state.home,
    auth : state.auth
})
const mapDispatchToProps = {getCarousel}
export default connect(mapStateToProps,mapDispatchToProps)(CarouselLanding)