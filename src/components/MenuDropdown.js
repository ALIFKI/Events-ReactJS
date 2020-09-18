import { Menu } from 'antd';
import React,{ Component } from 'react';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class MenuDropdown extends Component {
    constructor(props){
        super(props)
        this.state ={
            current : 'mail'
        }
    }
    
      handleClick = e => {
        // console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };
    render() {
        return (
            <div>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <SubMenu title="Navigation Three - Submenu">
                    <Menu.ItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default MenuDropdown