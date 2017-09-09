import React, {Component} from 'react'
import {Icon, Item, Menu, Segment} from 'semantic-ui-react'
import {Link, NavLink} from "react-router-dom";

export default class MainNavigation extends Component {
    render() {
        return (
            <Menu vertical fixed='left'
                  icon='labeled'>
                {/*<Menu.Item as={NavLink} to='/home'>*/}
                {/*Home*/}
                {/*</Menu.Item>*/}
                <Menu.Item header>
                    <br />
                    <Icon name="protect"/>
                    FINANCE<br />MASTER
                    <br />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/statistics/accounts'>
                    <Icon name="pie chart"/>
                    Kontenübersicht
                </Menu.Item>
                <Menu.Item as={NavLink} to='/accounting/records/'>
                    <Icon name="terminal"/>
                    Buchungssätze
                </Menu.Item>
                <Menu.Item as={NavLink} to='/masterdata'>
                    <Icon name="settings"/>
                    Stammdaten
                </Menu.Item>
            </Menu>
        )
    }
}
