import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link, NavLink} from "react-router-dom";

export default class MainNavigation extends Component {
    render() {
        return (
            <Menu vertical inverted fixed='left' style={{paddingTop: '1rem'}}>
                <Menu.Item as={NavLink} to='/first'>
                    root
                </Menu.Item>
                <Menu.Item as={NavLink} to='/home'>
                    Home
                </Menu.Item>
                <Menu.Item as={NavLink} to='/second'>
                    Second
                </Menu.Item>
            </Menu>
        )
    }
}
