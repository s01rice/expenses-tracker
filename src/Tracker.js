import { useFirestore, useUser, useFirestoreDocData } from 'reactfire'
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';


function Tracker() {
    const auth = useUser();
    const transactionRef = doc(useFirestore(), '/transactions', auth.data.uid);

    const { status, data } = useFirestoreDocData(transactionRef);

    const [user, setUser] = useState({
        transactions: [],
        money: 0,

        transactionName: '',
        transactionType: '',
        price: '',
        currentUID: auth.data.uid
    })

    // input fields change
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value !== '0' ? e.target.value : "",
            error: '',
        })
    };

    // add transaction
    const addNewTransaction = (e) => {
        e.preventDefault();
        if (user.transactionName && user.transactionType && user.price) {
            const transactionList = user.transactions;
            transactionList.push({
                uuid: nanoid(),
                name: user.transactionName,
                type: user.transactionType,
                price: user.price,
                user_id: user.currentUID,
            });
            setDoc(transactionRef, { transactionList })
                .then((data) => {
                    setUser({
                        ...user,
                        money: user.money + parseFloat(user.price),
                        transactions: transactionList,
                        transactionName: '',
                        transactionType: '',
                        price: ''
                    })
                })
                .catch((error) => {
                    console.log('error ', error)
                });

        }
    }

    // delete a transaction
    const deleteTransaction = (e, id) => {
        e.preventDefault();
        setUser({
            ...user,
            transactions: user.transactions.filter(function (item) {
                return item.uuid !== id
            })
        })
    }
    useEffect(() => {
        const transactionList = user.transactions;
        setUser({
            ...user,
            money: transactionList.reduce((a, b) => a = a + parseFloat(b.price), 0)
        })
        setDoc(transactionRef, { transactionList })
    }, [user.transactions])

    // initial loading transactions from firebase profile
    useEffect(() => {
        if (status === 'loading')
            return;
        const transactionList = data.transactionList;
        setUser({
            ...user,
            transactions: transactionList,
            money: transactionList.reduce((a, b) => a = a + parseFloat(b.price), 0)
        })
    }, [status]);

    return (
        <div id="contents" className="flex flex-col m-auto w-96">
            <div id="total-block" className="text-2xl text-center bg-white rounded-lg shadow-lg my-4">
                <h1 id="total" className="px-10 py-4">Total Spent: ${parseFloat(user.money).toFixed(2)}</h1>
            </div>
            <div id="transaction-block" className="bg-white rounded-lg my-4 shadow-lg">
                <div id="new-transaction" className="m-10">
                    <h1 className="text-lg text-center">New Transaction</h1>
                    <form className="flex flex-col">
                        <input className='border border-blue-300 rounded-md m-2 p-1 shadow-md focus:outline-none focus:ring-1 focus:ring-sky-400'
                            placeholder="Transaction Name"
                            type="text"
                            name="transactionName"
                            value={user.transactionName}
                            onChange={handleChange} />
                        <div id="group" className="flex">
                            <select className='border border-blue-300 rounded-md m-2 p-1 shadow-md focus:outline-none focus:ring-1 focus:ring-sky-400' name="transactionType"
                                value={user.transactionType}
                                onChange={handleChange}>
                                <option value="0">Type</option>
                                <option value="rent">Rent</option>
                                <option value="food">Food</option>
                                <option value="auto">Auto</option>
                                <option value="utilities">Utilities</option>
                                <option value="shopping">Shopping</option>
                                <option value="other">Other</option>
                            </select>
                            <input className='w-full border border-blue-300 rounded-md m-2 p-1 shadow-md focus:outline-none focus:ring-1 focus:ring-sky-400' placeholder="Amount" type="number" pattern="^\d*(\.\d{0,2})?$" min="0" name="price"
                                value={user.price}
                                onChange={handleChange} />
                        </div>
                        <button className='bg-white border border-blue-300 rounded-md m-2 p-1 shadow-md transition ease-in-out hover:text-white hover:bg-sky-400 duration-200' onClick={addNewTransaction}>Add</button>
                    </form>
                </div>

            </div>
            <div id="transaction-list" className="bg-white rounded-lg shadow-lg my-4 p-4">
                <p className="text-center text-lg">Recent Transactions</p>
                <ul>
                    {
                        Object.keys(user.transactions).map((id) => (
                            <li id={id} className="flex flex-row mx-8 py-1 border-b-[1px]">
                                <div>{user.transactions[id].name}</div>
                                <span className="text-slate-500 grow text-right">${parseFloat(user.transactions[id].price).toFixed(2)}</span>
                                <button className="p-1 text-xs text-slate-400" onClick={(e) => deleteTransaction(e, user.transactions[id].uuid)}>x</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Tracker;