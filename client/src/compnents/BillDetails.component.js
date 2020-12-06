import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import Home from './home/Home.component'
import OrderList from './home/OrdeList.component'

import { updateFood } from '../redux/actions/order.action';

export class BillDetails extends Component {

    onUpdateOrder(e, item) {
        e.preventDefault();
        this.props.updateFood(item, this.props.history);
    }

    render() {
        const { bill, one_bill, foodList, loading } = this.props;

        let bill_tables;
        if (bill === null || loading) {
            bill_tables = (<h4>Loading...</h4>)
        } else {
            if (bill.length > 0) {
                let count = bill.length
                bill_tables = bill.map((item, index) => (
                    <div>
                        <lable>Tip: {item.tip}%</lable>
                        <div className="order-list">
                            {!item.foodList ? ('') : (
                                <OrderList foodList={item.foodList} loading={loading} tip={item.tip} />
                            )}
                        </div>
                        <Button hidden={index !== 0} onClick={(e) => this.onUpdateOrder(e, item)} >Update Order</Button>
                        <hr />
                    </div>
                ))
            } else {
                bill_tables = (
                    <div>
                        <lable>Tip: {one_bill.tip}%</lable>
                        <div className="order-list">
                            {!foodList ? ('') : (
                                <OrderList foodList={foodList} loading={loading} tip={one_bill.tip} />
                            )}
                        </div>
                        {/* <Button hidden={index === 0}>Update</Button> */}
                        <hr />
                    </div>
                )
            }
        }

        return (
            <div>
                <Home />
                <div className="container">
                    <Link to="/">
                        <Button variant="info" style={{ 'width': '20%', 'right': '0' }}>Go back</Button>
                    </Link>
                    <div>
                        <div style={{ 'display': 'flex', 'justify-content': 'space-between', 'margin-top': "50px" }}>
                            <h3>Bill Number: {!one_bill.billNumber ? (bill[0].billNumber) : (one_bill.billNumber)}</h3>
                            <h3>Customer's Name: {!one_bill.customerName ? (bill[0].customerName) : (one_bill.customerName)}</h3>
                        </div>
                        <hr />
                        {bill_tables}

                    </div>
                </div>
            </div>
        )
    }
}

BillDetails.propTypes = {
    updateFood: PropTypes.func.isRequired,
    foodList: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    bill: state.bill.bill,
    one_bill: state.bill.one_bill,
    foodList: state.bill.one_bill.foodList,
    loading: state.bill.loading
})

export default connect(mapStateToProps, { updateFood })(BillDetails)
