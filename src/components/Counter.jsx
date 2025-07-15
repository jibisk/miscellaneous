
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../features/counter/counterSlice';
import { useState } from 'react';

export default function Counter() {

  const counter = useSelector( (state) => state.counter.value );
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(2);

  return (
  <>
    <input
        type="text"
         className='w-100 form-control mb-2'
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
    <div className="d-flex justify-content-center align-items-center mb-3">
        <button 
          id='decrease' 
          className='btn btn-dark'
          onClick={()=>dispatch(decrement(amount))} 
        >-- by {amount}</button>
        <div className='m-3 text-center fw-bold' style={{ width: '50px' }}>{counter}</div>
        <button 
          id='increase'
          className='btn btn-dark'
          onClick={()=>dispatch(increment(amount))} 
          >++ by {amount}</button>
    </div>
  </>
  );
}
