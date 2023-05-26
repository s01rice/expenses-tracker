import { useFirestore, useUser, useFirestoreDocData } from 'reactfire'
import { useState, useEffect } from 'react';
import { doc, addDoc, setDoc, collection } from 'firebase/firestore';


function Tracker() {
    const auth = useUser();
    const transactionRef = doc(useFirestore(), '/transactions', auth.data.uid);
    const transactionCollection = collection(useFirestore(), '/transactions');

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
            const backup = user.transactions;
            backup.push({
                id: backup.length + 1,
                name: user.transactionName,
                type: user.transactionType,
                price: user.price,
                user_id: user.currentUID,
            });
            setDoc(transactionRef, { backup });

        }
    }

    return (
        <div id="contents" className="flex flex-col m-auto">
            <h1 id="total" className="text-5xl">$500</h1>
            <div id="transaction-block" className="border border-red w-96">
                <div id="new-transaction" className="border border-red m-10">
                    <form className="flex flex-col">
                        <input className='border border-blue-300 rounded-md mx-2 my-1 p-1 focus:outline-none focus:ring-1 focus:ring-sky-400'
                            placeholder="Transaction Name"
                            type="text"
                            name="transactionName"
                            onChange={handleChange} />
                        <div id="group" className="flex">
                            <select className='border border-blue-300 rounded-md mx-2 my-1 p-1 focus:outline-none focus:ring-1 focus:ring-sky-400' name="transactionType" onChange={handleChange}>
                                <option value="0">Type</option>
                                <option value="rent">Rent</option>
                                <option value="food">Food</option>
                                <option value="gas">Gas</option>
                                <option value="entertainment">Entertainment</option>
                            </select>
                            <input className='w-full border border-blue-300 rounded-md mx-2 my-1 p-1 focus:outline-none focus:ring-1 focus:ring-sky-400' placeholder="Amount" type="text" name="price" onChange={handleChange} />
                        </div>
                        <button className='bg-white border border-blue-300 rounded-md mx-2 my-1 p-1 transition ease-in-out hover:text-white hover:bg-sky-400 duration-200' onClick={addNewTransaction}>Add</button>
                    </form>
                </div>

            </div>
            <div id="transaction-list">
                <p>Recent Transactions</p>
                <ul>

                </ul>
            </div>
        </div>
    )
}

export default Tracker;