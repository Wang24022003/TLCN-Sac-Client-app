import React, { useState,useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useSearchParams } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Range } from 'react-range';
import {AiFillStar} from 'react-icons/ai'
import {CiStar} from 'react-icons/ci' 
import Products from '../components/products/Products';
import {BsFillGridFill} from 'react-icons/bs'
import {FaThList} from 'react-icons/fa'
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {   query_product } from '../store/reducers/homeReducer';

const CategoryShop = () => {

    let [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    console.log(category)

    const dispatch = useDispatch();
    const { products, categories, latest_product, metadata } = useSelector(state => state.home);
    const [filter, setFilter] = useState(true);
    const [state, setState] = useState({ values: [0, 123456] });
    const [rating, setRating] = useState(null);
    const [styles, setStyles] = useState('grid');
    const [parPage, setParPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const [sort, setSort] = useState('');


    const buildQuery = () => {
        let query = `current=${pageNumber}&pageSize=10`;
        if (state.values) query += `&price>=${state.values[0]}&price<=${state.values[1]}`;
        if (category) query += `&category=${category}`;
        if (categoriesSelected.length > 0) {
            categoriesSelected.forEach(category => {
                query += `&category=${category}`; // Thêm từng category vào query
            });
        }
        if (rating) query += `&rating=${rating}`;
        if (sort) query += `&sort=${sort}`;
        return query;
    };


    useEffect(() => {
        const query = buildQuery();
        dispatch(query_product(query));
    }, [state, categoriesSelected, rating, pageNumber, sort, category]);

    
    

    const queryCategory = (e, value) => {
        if (e.target.checked) {
            setCategoriesSelected(prev => [...prev, value]); // Thêm danh mục vào danh sách
        } else {
            setCategoriesSelected(prev => prev.filter(category => category !== value)); // Xóa danh mục khỏi danh sách
        }
    };
    useEffect(() => { 
        const query = buildQuery();
        dispatch(query_product(query))
    },[])
    return (
        <div>
           <Header/>
           <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
            <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                <h2 className='text-3xl font-bold'>Category Page </h2>
                <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                        <Link to='/'>Home</Link>
                        <span className='pt-1'>
                        <IoIosArrowForward />
                        </span>
                        <span>Category </span>
                      </div>
                    </div> 
                </div> 
            </div> 
           </section>

           <section className='py-16'>
            <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className={` md:block hidden ${!filter ? 'mb-6' : 'mb-0'} `}>
                <button onClick={() => setFilter(!filter)} className='text-center w-full py-2 px-3 bg-indigo-500 text-white'>Filter Product</button> 
            </div>

            <div className='w-full flex flex-wrap'>
                <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0' } `}>
                    
                    
                    

        <div className='py-2 flex flex-col gap-5'>
            <h2 className='text-3xl font-bold mb-3 text-slate-600'>Price</h2>
             
             <Range
                step={5}
                min={0}
                max={123456}
                values={(state.values)}
                onChange={(values) => setState({values})}
                renderTrack={({props,children}) => (
                    <div {...props} className='w-full h-[6px] bg-slate-200 rounded-full cursor-pointer'>
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div className='w-[15px] h-[15px] bg-[#059473] rounded-full' {...props} />
    
                )} 
             />  
         <div>
         <span className='text-slate-800 font-bold text-lg'>${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}</span>  
           </div>
         </div>

         <div className='flex flex-col gap-3'>
                {[5, 4, 3, 2, 1, 0].map((star) => (
                    <div 
                        key={star} 
                        onClick={() => setRating(star)} // Chuyển đổi số thành chuỗi
                        className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'
                    >
                        {Array.from({ length: 5 }, (_, index) => (
                            index < star ? <AiFillStar key={index} /> : <CiStar key={index} />
                        ))}
                    </div>
                ))}
                <div className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                    {Array.from({ length: 5 }, (_, index) => (
                        <CiStar key={index} />
                    ))}
                    <span className='cursor-pointer' onClick={() => setRating('null')}>Clear</span>
                </div>
            </div>


        
        
        <div className='py-5 flex flex-col gap-4 md:hidden'>
            <Products title='Latest Product'  products={latest_product} />
        </div> 
          </div>

        <div className='w-9/12 md-lg:w-8/12 md:w-full'>
            <div className='pl-8 md:pl-0'>
                <div className='py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border'>
                    <h2 className='text-lg font-medium text-slate-600'>{metadata.total} Products </h2>
        <div className='flex justify-center items-center gap-3'>
        <select
            className='p-1 border outline-0 text-slate-600 font-semibold'
            value={sort}
            onChange={(e) => setSort(e.target.value)} 
        >
            <option value="">Sort By</option>
            <option value="price">Low to High Price</option>
            <option value="-price">High to Low Price</option>
        </select>
        <div className='flex justify-center items-start gap-4 md-lg:hidden'>
            <div onClick={()=> setStyles('grid')} className={`p-2 ${styles === 'grid' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `} >
                  <BsFillGridFill/>  
            </div>
            <div onClick={()=> setStyles('list')} className={`p-2 ${styles === 'list' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `} >
                  <FaThList/>  
            </div> 
        </div> 
        </div> 
         </div> 
         <div className='pb-8'>
                  <ShopProducts products={products} styles={styles} />  
         </div>

        
         <div>
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={10} parPage={parPage} showItem={Math.floor(10 / 3 )} metadata={metadata}/>
         </div>





            </div> 
         </div>  




            </div>
            </div> 
           </section>

           <Footer/>
        </div>
    );
};

export default CategoryShop;