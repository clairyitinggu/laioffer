import React, {Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import {HISTORY, TOKEN_KEY} from "../constants";

class HistoryTable extends Component {
    state = {
        isLoadingList : false,
        data : {
            columns: [

                {
                    label: 'Tracking Number',
                    field: 'tracking_number',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Method',
                    field: 'method',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'RobotID',
                    field: 'robot_id',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Destination',
                    field: 'destination',
                    sort: 'asc',
                    width: 200
                }

            ],
            rows: [
                {
                    OrderNum: 'N/A',
                    Status: 'N/A',
                    TrackNum: 'N/A',
                    Method: 'N/A'

                }
            ]

        }
    }
    rowEvents = (status,trackNum,method) => {
        //console.log(params);
        if (status == 'shipping')
        this.props.rowEvents(trackNum,method);
    };

    componentDidMount() {
        if (this.state.data.rows[0].OrderNum === 'N/A') {
            console.log("load data");
            const url = `${HISTORY}`;
            const token = localStorage.getItem(TOKEN_KEY);
            this.setState({
                isLoadingList: true
            });

            axios.get(url, {
                headers: {
                    Authorization: token
                }
            })
                .then(response => {
                    console.log('response->',response.data)
                    this.setState({
                        data: { columns : this.state.data.columns,
                                rows : response.data.orders
                        },
                        isLoadingList: false
                    })

                    this.setState({
                        data : { columns : this.state.data.columns,
                                 rows : this.state.data.rows.map(item => {return {
                                                ...item,
                                                clickEvent : () => this.rowEvents(item.status,item.tracking_number,item.method)
                                 }})
                    }});

                    // this.setState({data : {columns : this.state.data.columns, rows : this.state.data.rows.map(item => {return {
                    //             tracking_number: response.data.orders.tracking_number,
                    //             clickEvent : () => this.rowEvents(item.tracking_number)
                    //         }})
                    // }});

                    console.log('state data: ', this.state.data);
                })
                .catch(error => {
                    console.log('err in fetch history -> ', error);
                })
        }

    }

    render() {

        return (
            <MDBDataTable
                scrollY
                maxHeight="180px"
                striped
                bordered
                small
                data={this.state.data}
                //theadTextWhite
                //tbodyTextWhite
            />
        );
    }
}

export default HistoryTable;