import React from "react"

import {Label} from "semantic-ui-react";
export function getAccountColor(type) {
    switch (type) {
        case "AS":
            return "blue"
        case "LI":
            return "yellow"
        case "RE":
            return "green"
        case "EX":
            return "red"
    }
    console.log("Could not find type " + type)
    return "pink"
}

export function getAccountLabel(account) {
    return (
        <Label size="tiny" basic color={getAccountColor(account.type)}>{account.number}</Label>
    )
}