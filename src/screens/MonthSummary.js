import React, { useState } from 'react';

function MonthSummary() {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

    const categories = ['Food', 'Entertainment', 'Necessities', 'Groceries', 'Travel', 'Household Items'];

    const handleAddCost = (event) => {
        event.preventDefault();
        console.log(category, description, amount);
    }

    return (
        <div className='monthContainer'>
            <div className='costs'>
                <h2>Costs</h2>
                <div className='costInput'>
                    <h3>Add Cost</h3>
                    <form className='costForm'>
                        <div className='costFormItem'>
                            <label htmlFor='description'>Description: </label>
                            <input onChange={(el) => { setDescription(el.target.value) }} type='text' id='description' name='description' />
                        </div>
                        <div className='costFormItem'>
                            <label htmlFor='category'>Category: </label>
                            <select id='category' name='category' defaultValue={'DEFAULT'} onChange={(el) => { setCategory(el.target.value) }}>
                                <option value='DEFAULT' disabled>Select Category</option>
                                {categories.map(item => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className='costFormItem'>
                            <label htmlFor='amount'>Amount: </label>
                            <input onChange={(el) => { setAmount(el.target.value) }} type='text' id='amount' name='amount' />
                        </div>
                        <button onClick={handleAddCost}>Add</button>
                    </form>
                </div>
                <div className='costList'>
                    <div className='costItem'>
                        <p>Description</p>
                        <p>Category</p>
                        <p>Amount</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MonthSummary;