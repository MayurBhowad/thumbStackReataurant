import React, { Component } from 'react'

export class UpdateOrder extends Component {
    render() {
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

export default UpdateOrder
