import React,{ Component } from 'react';
import Style from './CardBook.module.css'
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button} from 'reactstrap';
import { EnvironmentOutlined } from '@ant-design/icons'
import Moment from 'react-moment'

class CardList extends Component {
    constructor(props){
        super(props)

        console.log(this.props)
    }
    render() {
        return (
            <div>
                <Card className={`${Style.cardBody}`}>
                   <img src={`http://localhost:3000/uploads/${this.props.data.image}`} className={`${Style.image}`}/>
                    <CardBody className={'pb-0'}>
                    <div className="d-flex flex-row justify-content-start align-items-center pb-3">
                        <EnvironmentOutlined />
                        <CardTitle className={`${Style.loc}`}> {this.props.data.location} </CardTitle>
                    </div>
                    <CardSubtitle className={`${Style.title}`}> {this.props.data.events} </CardSubtitle>
                    <p className={`${Style.date}`}>
                        <Moment format="LL" date={this.props.data.date} /> 
                    </p>
                    <hr/>
                    <div className={`${Style.people}`}>
                        <div className='d-flex flex-row justify-content-start align-items-center'>
                            <img src="https://www.iconfinder.com/data/icons/people-flat-design/64/Man-Person-People-Avatar-User-Happy-512.png" className={`${Style.img}`}/>
                            <p className={`${Style.userName}`}> {this.props.data.participan} </p>
                        </div>
                    </div>
                    <hr/>
                    <CardText className={`${Style.note}`}>
                        <div className={`p-2 d-flex flex-row`}>
                            <p className={'pl-1'}>
                              <b>  Note : </b>
                            {this.props.data.note.slice(0,50)}...
                            </p>
                        </div>
                    </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default CardList