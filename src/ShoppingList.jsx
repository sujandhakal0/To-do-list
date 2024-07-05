import React from 'react';
import { useState } from 'react'

import './index.css'; 

const ShoppingList = () => {

    const [shoppingList, setShoppingList] = useState([
        {item: 'Apple', quantity: 20},
        {item: 'Mango', quantity: 30},
    ])

    const addNewList = (event) =>{
        event.preventDefault()

        let newList = { 
            item: event.target.newItem.value, 
            quantity: parseInt(event.target.newQuantity.value) 
        };

        let tempList = [...shoppingList]
        tempList.push(newList)
        setShoppingList(tempList)

        event.target.newItem.value = ""
        event.target.newQuantity.value = ""
    }

    const removeList = (index) =>  {
        let tempList = [...shoppingList]

        tempList.splice(index, 1)
        setShoppingList(tempList)
    }

    return (
        <div className="shopping-list">
            <h2>Shopping List</h2>
            <form onSubmit={addNewList}>
                <input type="text" placeholder="Item" name='newItem' />
                <input type="number" placeholder="Quantity" name='newQuantity' />
                <button>Add Item</button>
            </form>

            <table className="shopping-list__table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                  {
                    shoppingList.map((list, index)=>(
                        <tr key={index}>
                            <td>{list.item}</td>
                            <td>{list.quantity}</td>
                            <td><button onClick={removeList}>Delete</button></td>
                        </tr>
                    ))
                  }
                </tbody>
            </table>
        </div>
    );
};

export default ShoppingList;