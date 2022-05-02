import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { doc, setDoc, addDoc, collection, getDoc, onSnapshot, query, getDocs, orderBy } from 'firebase/firestore';
import dateFormat from '../helpers/dateFormat';

function MonthSummary(props) {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [costList, setCostList] = useState();
    const [loading, setLoading] = useState(true);

    const categories = ['Food', 'Entertainment', 'Necessities', 'Groceries', 'Travel', 'Household Items'];

    // const handleAddCost = async (event) => {
    //     event.preventDefault();
    //     console.log(category, description, amount, date);
    //     try {
    //         const docRef = await addDoc(collection(db, `users/${props.user.uid}/costs`), {
    //             description: description,
    //             category: category,
    //             amount: amount,
    //             date: date
    //         });
    //         console.log(docRef);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    console.log(props.user.uid);

    useEffect(() => {
        
    }, [])

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
                                {props.categories.map(item => (
                                    <option key={item.id}>{item.data.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='costFormItem'>
                            <label htmlFor='amount'>Amount: </label>
                            <div className='costFormItem' style={{ justifyContent: 'flex-end' }}>
                                <span className='dollarSign'>$</span>
                                <input onChange={(el) => { setAmount(el.target.value) }} type='number' min='0.01' step='0.01' id='amount' name='amount' />
                            </div>
                        </div>
                        <div className='costFormItem'>
                            <label htmlFor='date'>Date: </label>
                            <input onChange={(el) => { setDate(el.target.value) }} type='date' id='date' name='date' />
                        </div>

                        <button onClick={() => {}}>Add</button>
                    </form>
                </div>
                <div className='costList'>
                    <div className='costItem listHeading'>
                        <p>Date</p>
                        <p>Description</p>
                        <p>Category</p>
                        <p>Amount</p>
                    </div>
                    {/* {!loading && costList.map((cost) => (
                        <div className='costItem'>
                            <p>{dateFormat(cost.date)}</p>
                            <p>{cost.description}</p>
                            <p>{cost.category}</p>
                            <p>${Number.parseFloat(cost.amount).toFixed(2)}</p>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    )
};

export default MonthSummary;