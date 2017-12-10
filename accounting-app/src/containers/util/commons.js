import React from 'react'

import {Label} from 'semantic-ui-react';
export function getAccountColor(type='') {
    switch (type) {
        case 'AS':
            return 'blue';
        case 'LI':
            return 'yellow';
        case 'RE':
            return 'green';
        case 'EX':
            return 'red'
    }
    console.log('Could not find type ' + type);
    return 'pink'
}

const accountDefault = {type: '', number: 0};

export function getAccountLabel(account=accountDefault) {
    const a = account === null ? accountDefault : account;
    return (
        <Label size="tiny" basic color={getAccountColor(a.type)}>{a.number}</Label>
    )
}