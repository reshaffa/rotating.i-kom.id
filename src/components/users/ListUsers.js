import React, { Component } from 'react';
import TableComponent from '../tables/TableComponent';

const data = [
    { id : 1, username: "Admin", email: "admin@pertamina.com", phone : "085768955431"}
]
const table = [
    { dataField: 'id', text: '#' },
    { dataField: 'username', text: 'Username'},
    { dataField: 'email', text: 'Email'},
    { dataField: 'phone', text: 'Phone'}
]

export default class ListUsers extends Component {
    render() {
        return (
            <div>
                <TableComponent data={data} table={table} />
            </div>
        )
    }
}
