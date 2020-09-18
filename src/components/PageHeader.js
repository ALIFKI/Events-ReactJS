import React,{ Component } from 'react'
import { PageHeader } from 'antd';
import MenuDropdown from '../components/MenuDropdown';

class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                  <PageHeader
                    extra={[
                        <MenuDropdown/>
                    ]}
                    title="Title"
                    subTitle="This is a subtitle"
                    style={{border: '1px solid rgb(235, 237, 240)'}}
                />,
            </div>
        )
    }
}

export default Header