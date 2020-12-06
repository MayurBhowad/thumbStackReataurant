import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap';

export class OrderList extends Component {
    render() {
        const { foodList, loading, tip, onSelect } = this.props;

        let table_row;
        if (foodList === null || loading) {
            // table_row = (<h3>Loading...</h3>)
        } else {

            if (foodList.length > 0) {
                table_row = foodList.map((item, index) => (<TableRow index={index} food={item} onSelect={onSelect} />))
            } else {
                // table_row = (<h3>not found</h3>)
            }
        }

        let totalPrice = 0;
        if (foodList === null || loading) {
            totalPrice = 0;
        } else {
            foodList.map(item => {
                totalPrice = totalPrice + (item.price * (item.quantity))
            })
        }

        if (tip > 0) {
            let tipCal = ((totalPrice * tip) / 100);
            totalPrice = totalPrice + tipCal
        }


        return (
            <div>
                <p>Order List</p>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Food Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table_row}
                            <tr>
                                <td>.</td>
                                <td colSpan={2}><strong>Total Price</strong></td>
                                <td><strong>Rs. {totalPrice}</strong> /- </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

class TableRow extends Component {
    render() {
        const { index, food, onSelect } = this.props;

        let ItemPrice = food.price * food.quantity;
        return (

            <tr key={index + 1} onClick={!onSelect ? (() => { }) : ((e) => onSelect(e, food))}>
                <td>{index + 1}</td>
                <td>{food.foodTag}</td>
                <td>{food.quantity}</td>
                <td>Rs. {ItemPrice}</td>
            </tr>
        )
    }
}

export default OrderList
