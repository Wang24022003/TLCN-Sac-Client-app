import React, { useEffect } from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_product_history, messageClear } from '../../store/reducers/dashboardReducer';
import toast from 'react-hot-toast';
import { add_to_wishlist } from '../../store/reducers/cardReducer';

const History = () => {

    const dispatch = useDispatch()
    const {userInfo } = useSelector(state => state.auth)
    const {history,successMessage } = useSelector(state => state.dashboard)
   
    useEffect(() => {
        dispatch(get_product_history(userInfo.id))
    },[])

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        }   
    },[successMessage])

    const add_wishlist = (pro) => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                product: {
                    _id: pro._id,
                    name: pro.name
                }
            }));
        } 
    };

    return (
        <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
            {
                history.map((p, i) => <div key={i} className='border group transition-all duration-500 hover:shadow-md hover:-mt-3 bg-white'>
                <div className='relative overflow-hidden'>
                
                {
                    p.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.product.discount}% </div> 
                }
           
                   
            
    
            <img className='sm:w-full w-full h-[240px]' src={p.images} alt="" />  
    
            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                <li onClick={() => add_wishlist(p)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                <FaRegHeart />
                </li>
                <Link to={`/products/${p._id}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                <FaEye />
                </Link>
                <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                <RiShoppingCartLine />
                </li>
            </ul>    
                </div>
    
            <div className='py-3 text-slate-600 px-2'>
                <h2 className='font-bold'>{p.name} </h2>
                <div className='flex justify-start items-center gap-3'>
                    <span className='text-md font-semibold'>${p.price}</span>
                    <div className='flex'>
                        <Rating ratings={p.rating} />
                    </div>
    
                </div>
            </div>    
    
    
    
    
            </div> )
            }
        </div>
    );
};

export default History;