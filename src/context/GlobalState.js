import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import firebase from '../firebase/firbase';

//Initial State
const initialState = {
    transactions: []
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider component

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    function getTransactions() {
        try {
            const itemsRef = firebase.database().ref('transactions');
            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val();
                let transactions = [];
                for (let item in items) {
                    transactions.push({
                        id: item,
                        text: items[item].text,
                        amount: items[item].amount
                    });
                }
                dispatch({ type: 'GET_T', payload: transactions });

            });
        } catch (error) {
            dispatch({ type: 'DELETE_T', payload: error });
        }
    }
    function addTransaction(transaction) {
        try {
            const itemsRef = firebase.database().ref('transactions');

            itemsRef.push(transaction);
        } catch (error) {
            dispatch({ type: 'DELETE_T', payload: error });
        }

    }
    function deleteTransaction(id) {
        try {
            const itemRef = firebase.database().ref(`/transactions/${id}`);
            itemRef.remove();
            dispatch({ type: 'DELETE_T', payload: id });
        } catch (error) {
            dispatch({ type: 'DELETE_T', payload: error });
        }
    }
    return (<GlobalContext.Provider value={{ transactions: state.transactions, deleteTransaction, addTransaction, getTransactions }}>{children}</GlobalContext.Provider>)
}

export default GlobalProvider;