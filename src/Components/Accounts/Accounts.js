import React, { Component } from 'react';
import ApiFacade from './ApiFacade';
import './Accounts.css';
import RowFormatter from './RowFormatter';
import dayjs from 'dayjs';

export default class Accounts extends Component {
    constructor(){
        super();
        this.state = {
            accounts : {
                active:[],
                inactive:[],
                overdue:[],
            },
            axiosConfig: {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials':true
                }
            }
        }
    }

    async componentDidMount(){
        const {
            axiosConfig
        } = this.state;
        let accounts = await ApiFacade.getAccounts(axiosConfig);
        accounts = RowFormatter.formatRows(accounts);

        debugger;

        const active = accounts.filter(x => 
            x.AccountStatusId === 0);

        const inactive = accounts.filter(x => 
            x.AccountStatusId === 1);

        const overdue = accounts.filter(x => 
            x.AccountStatusId === 2);

        accounts = {active, inactive, overdue}

        this.setState({accounts});
        debugger;
    }

    render() {

        const {
            accounts
        } = this.state;

        debugger;

        return (
            <div style={{display:'flex'}}>
                <div>
                    <div style={{width:'100%', fontWeight:'bold', textAlign:'center',
                        textDecoration:'underline'}}>ACTIVE</div>
                    <br/>
                    {accounts && accounts.active && accounts.active.map((x) => (
                        <div style={{height:175}}>
                            <ul class="account-data-list">
                                <li><label>Name:</label>{x.Name}</li>
                                <li><label>Email:</label>{x.Email}</li>
                                <li><label>Phone Number:</label>{x.PhoneNumber}</li>
                                <li><label>Amount Due:</label>{x.AmountDue}</li>
                                {x.PaymentDueDate && (
                                    <li><label>Due Date:</label>{x.PaymentDueDate}</li>
                                )}
                            </ul>
                            <br/>
                        </div>
                    ))}
                </div>
                <div>
                <div style={{width:'100%', fontWeight:'bold', textAlign:'center',
                        textDecoration:'underline'}}>INACTIVE</div>
                    <br/>
                    {accounts && accounts.inactive && accounts.inactive.map((x) => (
                        <div style={{height:175}}>
                            <ul class="account-data-list">
                                <li><label>Name:</label>{x.Name}</li>
                                <li><label>Email:</label>{x.Email}</li>
                                <li><label>Phone Number:</label>{x.PhoneNumber}</li>
                                <li><label>Amount Due:</label>{x.AmountDue}</li>
                                {x.PaymentDueDate && (
                                    <li><label>Due Date:</label>{x.PaymentDueDate}</li>
                                )}
                            </ul>
                            <br/>
                        </div>
                    ))}
                </div>
                <div>
                <div style={{width:'100%', fontWeight:'bold', textAlign:'center',
                        textDecoration:'underline'}}>OVERDUE</div>
                    <br/>
                    {accounts && accounts.overdue && accounts.overdue.map((x) => (
                        <div style={{height:175}}>
                            <ul class="account-data-list">
                                <li><label>Name:</label>{x.Name}</li>
                                <li><label>Email:</label>{x.Email}</li>
                                <li><label>Phone Number:</label>{x.PhoneNumber}</li>
                                <li><label>Amount Due:</label>{x.AmountDue}</li>
                                {x.PaymentDueDate && (
                                    <li><label>Due Date:</label>{x.PaymentDueDate}</li>
                                )}
                            </ul>
                            <br/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
