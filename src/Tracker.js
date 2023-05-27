import { useFirestore, useUser, useFirestoreDocData } from 'reactfire'
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';


function Tracker() {
    const auth = useUser();
    const transactionRef = doc(useFirestore(), '/transactions', auth.data.uid);
    // const transactionCollection = collection(useFirestore(), '/transactions');

    const { status, data } = useFirestoreDocData(transactionRef);

    const [user, setUser] = useState({
        transactions: [],
        money: 0,

        transactionName: '',
        transactionType: '',
        price: '',
        currentUID: auth.data.uid
    })

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value !== '0' ? e.target.value : "",
            error: '',
        })
    };

    const addNewTransaction = (e) => {
        e.preventDefault();
        if (user.transactionName && user.transactionType && user.price) {
            const transactionList = user.transactions;
            transactionList.push({
                id: transactionList.length + 1,
                name: user.transactionName,
                type: user.transactionType,
                price: user.price,
                user_id: user.currentUID,
            });
            setDoc(transactionRef, { transactionList })
                .then((data) => {
                    setUser({
                        ...user,
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

    useEffect(() => {
        const transactionList = data.transactionList;
        setUser({
            ...user,
            transactions: transactionList
        })
        // console.log(transactionList);
    }, []);

    return (
        <div id="contents" className="flex flex-col m-auto w-96">
            <h1 id="total" className="text-5xl">$500</h1>
            <div id="transaction-block" className="bg-white rounded-lg shadow-lg">
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
                                <option value="gas">Gas</option>
                                <option value="entertainment">Entertainment</option>
                            </select>
                            <input className='w-full border border-blue-300 rounded-md m-2 p-1 shadow-md focus:outline-none focus:ring-1 focus:ring-sky-400' placeholder="Amount" type="number" pattern="^\d*(\.\d{0,2})?$" min="0" name="price"
                                value={user.price}
                                onChange={handleChange} />
                        </div>
                        <button className='bg-white border border-blue-300 rounded-md m-2 p-1 shadow-md transition ease-in-out hover:text-white hover:bg-sky-400 duration-200' onClick={addNewTransaction}>Add</button>
                    </form>
                </div>

            </div>
            <div id="transaction-list" className="bg-white rounded-lg shadow-lg my-6 p-4">
                <p className="text-center text-lg">Recent Transactions</p>
                <ul>
                    {
                        Object.keys(user.transactions).map((id) => (
                            <li id={id} className="flex flex-row mx-8 py-1 border-b-[1px]">
                                <div>{user.transactions[id].name}</div>
                                <span className="text-slate-500 grow text-right">${parseFloat(user.transactions[id].price).toFixed(2)}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Tracker;