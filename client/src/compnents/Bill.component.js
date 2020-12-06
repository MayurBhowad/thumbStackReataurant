import React, { Component } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeAllFood, checkOut } from '../redux/actions/order.action';

import Home from './home/Home.component'
import OrderList from './home/OrdeList.component';

export class Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            tip: '0',
            update: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.update.customerName) {
            this.setState({
                name: this.props.update.customerName,
                phone: this.props.update.phoneNumber,
                tip: this.props.update.tip,
                update: true,
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const billDetails = {
            billNumber: this.props.update.billNumber,
            customerName: this.state.name,
            foodList: this.props.foodList,
            phone: this.state.phone,
            tip: this.state.tip
        }

        this.props.checkOut(billDetails, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { foodList, loading, update } = this.props;

        return (
            <div>
                <Home />
                <div className="container">
                    <Link to="/">
                        <Button variant="info" style={{ 'width': '20%', 'float': 'right' }}>Go back</Button>
                    </Link>
                    <h2>Check Out Bill</h2>
                    <Form onSubmit={this.onSubmit}>
                        <Row>
                            <Col>
                                <label htmlFor="">Customer Name*</label>
                                <Form.Control
                                    placeholder="Customer's Name"
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                                <br />
                                <label htmlFor="">Phone*</label>
                                <Form.Control
                                    placeholder="Phone"
                                    type="number"
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                />
                                <br />
                                <label htmlFor="">Tip</label>
                                <Form.Control
                                    placeholder="Tip %"
                                    type="number"
                                    name="tip"
                                    value={this.state.tip}
                                    onChange={this.onChange}
                                />
                                <div className="order-list">
                                    <OrderList foodList={foodList} loading={loading} tip={this.state.tip} />
                                </div>
                                <div>
                                    {/* <Link to="/billDetails"> */}
                                    <Button variant="primary" disabled={!this.state.name || !this.state.phone} type="submit">
                                        {this.state.update ? 'Update Order adn Check Out' : 'Check Out'}
                                    </Button>
                                    {/* </Link> */}
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    foodList: state.order.foodList,
    loading: state.order.loading,
    update: state.order.update
})

export default connect(mapStateToProps, { removeAllFood, checkOut })(Bill)
