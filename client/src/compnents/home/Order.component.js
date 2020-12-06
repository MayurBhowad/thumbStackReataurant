import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, Row, Col } from 'react-bootstrap';
import OrderList from './OrdeList.component'

import { addFood } from '../../redux/actions/order.action';
import Home from './Home.component';

export class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodTag: '',
            quantity: '',
            price: '',
            add: true
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const orderData = {
            foodTag: this.state.foodTag,
            quantity: this.state.quantity,
            price: this.state.price,
        }
        this.props.addFood(orderData)
        // console.log(orderData);
        this.setState({ foodTag: '', quantity: '', price: '', add: true, tip: 0 })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSelect(e, food) {
        e.preventDefault();
        this.setState({
            foodTag: food.foodTag,
            quantity: food.quantity,
            price: food.price,
            add: false
        })
    }

    render() {
        const { foodList, loading } = this.props;
        return (
            <div>
                <Home />
                <div className='container'>
                    <p>Order Food Below</p>
                    <div className="order">
                        <Form onSubmit={this.onSubmit}>
                            <Row>
                                <Col sm md="6">
                                    <Form.Control
                                        placeholder="Food Tag"
                                        type="text"
                                        name="foodTag"
                                        value={this.state.foodTag}
                                        onChange={this.onChange}
                                        required
                                    />
                                </Col>
                                <Col sm md="2">
                                    <Form.Control
                                        placeholder="Price"
                                        type="number"
                                        name="price"
                                        value={this.state.price}
                                        onChange={this.onChange}
                                        required
                                    />
                                </Col>
                                <Col sm md="2">
                                    <Form.Control
                                        placeholder="Quantity"
                                        type="number"
                                        name="quantity"
                                        value={this.state.quantity}
                                        onChange={this.onChange}
                                        required
                                    />
                                </Col>
                                <Col sm md="2">
                                    {this.state.add ? (<Button variant="primary" type="submit">Add</Button>) : (<Button variant="primary" type="submit">Update</Button>)}
                                </Col>
                            </Row>
                            <div className="order-list">
                                <OrderList foodList={foodList} loading={loading} onSelect={this.onSelect} />
                            </div>
                        </Form>
                    </div>

                    <div>
                        <Link to="/bill">
                            <Button variant="primary" type="submit">Confirm Bill</Button>
                        </Link>
                    </div>
                    <div style={{ 'margin-top': '40px' }}>
                        <Link to="/billNumber">
                            <p>Find bill by Bill</p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

Order.propTypes = {
    addFood: PropTypes.func.isRequired,
    foodList: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    foodList: state.order.foodList,
    loading: state.order.loading
});

export default connect(mapStateToProps, { addFood })(Order);

