import { useQuery, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { ME } from '../api/queries';
import { ADD_COST } from '../api/mutations';
import dateFormat from '../helpers/dateFormat';
import AuthService from '../utils/auth';

function MonthSummary(props) {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [costList, setCostList] = useState();

    const categories = ['Food', 'Entertainment', 'Necessities', 'Groceries', 'Travel', 'Household Items'];

    const { data, error, loading } = useQuery(ME);
    const [addCost, { error: costError, data: newCostData }] = useMutation(ADD_COST);

    const addCostFormHandler = async (e) => {
        e.preventDefault();
        const { data } = await addCost({ variables: { description, category, amount, date } });
        console.log(data.addCost.costs);
        setCostList(data.addCost.costs);
    }

    useEffect(() => {
        if (!loading && data) {
            setCostList(data.me.costs);
        } else if (error) {
            AuthService.logout();
            props.setLoggedIn(false);
        }
       
    }, [data, loading]);


    return (
        <div className='monthContainer'>
            <div className='costs'>
                <h2>Costs</h2>
                <div className='costInput'>
                    <h3>Add Cost</h3>
                    <form className='costForm' onSubmit={addCostFormHandler}>
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
                            <div className='costFormItem' style={{ justifyContent: 'flex-end' }}>
                                <span className='dollarSign'>$</span>
                                <input onChange={(el) => { setAmount(Number.parseFloat(el.target.value)) }} type='number' min='0.01' step='0.01' id='amount' name='amount' />
                            </div>
                        </div>
                        <div className='costFormItem'>
                            <label htmlFor='date'>Date: </label>
                            <input onChange={(el) => { setDate(el.target.value) }} type='date' id='date' name='date' />
                        </div>

                        <button type='submit'>Add</button>
                    </form>
                </div>
                <div className='costList'>
                    <div className='costItem listHeading'>
                        <p>Date</p>
                        <p>Description</p>
                        <p>Category</p>
                        <p>Amount</p>
                    </div>
                    {(!loading && data && costList) && costList.map((cost) => (
                        <div className='costItem' key={cost._id}>
                            <p>{dateFormat(cost.date)}</p>
                            <p>{cost.description}</p>
                            <p>{cost.category}</p>
                            <p>${Number.parseFloat(cost.amount).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default MonthSummary;