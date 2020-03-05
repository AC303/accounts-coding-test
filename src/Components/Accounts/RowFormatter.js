import React, { Component } from 'react'
import dayjs from 'dayjs';

export default class RowFormatter extends Component {

    static formatRows(accounts){
        accounts = this.formatDueDates(accounts);
        accounts = this.formatNames(accounts);
        accounts = this.formatPhoneNumbers(accounts);
        accounts = this.formatAmountDue(accounts);  
        return accounts;        
    }

    static formatDueDates(accounts){
        let dueDate;
        accounts.forEach(x => {
            if(!x.PaymentDueDate){
                //continue
                return;
            }
            dueDate = x.PaymentDueDate.split('T')[0];
            dueDate = dayjs(dueDate).format('MM/DD/YYYY');
            x.PaymentDueDate = dueDate;
        })
        return accounts;
    }

    static formatNames(accounts){
        accounts.forEach(x => {
            x.Name = x.LastName + ', ' + x.FirstName;
        });
        return accounts;
    }

    static formatPhoneNumbers(accounts){
        let part1;
        let part2;
        let part3;
        accounts.forEach(x => {
            part1 = x.PhoneNumber.substring(0,3);
            part2 = x.PhoneNumber.substring(3,6);
            part3 = x.PhoneNumber.substring(6,10);
            x.PhoneNumber = `(${part1})-${part2}-${part3}`;
        });
        return accounts;
    }

    static formatAmountDue(accounts){
        let toFixed;
        let padded;
        accounts.forEach(x => {
            toFixed = x.AmountDue.toFixed(2);
            padded = this.pad(toFixed, 5);
            x.AmountDue = `$${padded}`;
        });
        return accounts;
    }

    static pad(number, size){
        let s = String(number);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    }
}
