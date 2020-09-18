import React, { Component } from 'react'
import Style from './LoadingStyle.module.css'
export default class Loading extends Component {
    render() {
        return (
            <div className={`${Style.loading}`}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
    }
}
