import React, { Component } from 'react';
import axios from 'axios';

export default class ApiFacade extends Component {
    static async getAccounts(axiosConfig){
    const url = 'https://frontiercodingtests.azurewebsites.net/api/accounts/getall';

    let accounts;
    await axios.get(url, axiosConfig)
        .then(function(response){
            accounts = response.data;
        })
        .catch(function (error) {
            // TODO: save error message to an errors database
        });
        return accounts; 
    }
}
