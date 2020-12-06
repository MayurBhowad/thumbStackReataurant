import React, { Component } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Home from '../home/Home.component'
import PropTypes from 'prop-types';


import OrderList from '../home/OrdeList.component';

import { getBillDetails, getBillDetailsByPhone } from '../../redux/actions/order.action';

export class FindBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billNumber: '',
            phone: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.billNumber) {
            this.props.getBillDetails(this.state.billNumber, this.props.history)
        } else if (this.state.phone) {
            this.props.getBillDetailsByPhone(this.state.phone, this.props.history)
        }
    }
    onChange(e) { this.setState({ [e.target.name]: e.target.value }) }

    render() {
        const { bill, foodList, loading } = this.props;
        return (
            <div>
                <Home />
                <div className="container">
                    <Link to="/">
                        <Button variant="info" style={{ 'width': '20%', 'float': 'right' }}>Go back</Button>
                    </Link>
                    <h2>Find Bill</h2>
                    <p>Bill Number: </p>
                    <Form onSubmit={this.onSubmit}>
                        <Row>
                            <Col>
                                <Form.Control
                                    placeholder="Bill Number"
                                    type="text"
                                    name="billNumber"
                                    value={this.state.billNumber}
                                    onChange={this.onChange}
                                />
                                <lable>OR</lable>
                                <Form.Control
                                    placeholder="Phone Number"
                                    type="number"
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                />
                                <div style={{ 'margin-top': '10px' }}>
                                    {/* <Link to="/bill"> */}
                                    <Button variant="primary" disabled={!this.state.billNumber && !this.state.phone} type="submit">Find</Button>
                                    {/* </Link> */}
                                </div>
                                <div style={{ 'display': 'flex', 'justify-content': 'space-between', 'margin-top': "30px" }}>
                                    <h3>Bill Number: {bill.billNumber}</h3>
                                    <h3>Customer's Name: {bill.customerName}</h3>
                                </div>
                                <div className="order-list">
                                    {!foodList ? ('') : (
                                        <OrderList foodList={foodList} loading={loading} />
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        )
    }
}

FindBill.propTypes = {
    getBillDetails: PropTypes.func.isRequired,
    getBillDetailsByPhone: PropTypes.func.isRequired,
    foodList: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    bill: state.bill.bill,
    foodList: state.bill.bill.foodList,
    loading: state.bill.loading
})

export default connect(mapStateToProps, { getBillDetails, getBillDetailsByPhone })(FindBill)
