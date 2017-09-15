import React, {Component} from 'react'
import {Icon, Item, Menu, Segment} from 'semantic-ui-react'
import {Link, NavLink} from "react-router-dom";

import MobileDetect from "mobile-detect"

export default class MainNavigation extends Component {
    render() {

        const isMobile = new MobileDetect(window.navigator.userAgent).mobile()

        return (
            <Menu vertical fluid={isMobile} fixed={!isMobile ? 'left' : ''}
                  icon='labeled' style={isMobile ? {marginTop: 0} : {}}>
                <Menu.Item header>
                    <br />
                    <Icon name="protect"/>
                    FINANCE<br />MASTER
                    <br />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/statistics/spreadsheet'>
                    <Icon name="table"/>
                    Spreadsheet
                </Menu.Item>
                <Menu.Item as={NavLink} to='/statistics/accounts'>
                    <Icon name="list"/>
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
