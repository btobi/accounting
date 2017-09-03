import React from "react"
import {connect} from "react-redux";
import {fetchStocks} from "../../actions/stockActions";

@connect((store) => {
        return {
            stocks: store.stocks.stocks
        }
    }
)
export default class Home extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchStocks())
    }

    render() {

        let stockList = Array.isArray(this.props.stocks) ?
            this.props.stocks.map((stock, index) => <li key={index}>{stock.ticker}</li>) : <p>empty</p>;

        return (

            <ul>
                {stockList}
            </ul>

        )
    }

}