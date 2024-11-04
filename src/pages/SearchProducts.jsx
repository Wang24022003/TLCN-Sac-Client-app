import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Range } from 'react-range';
import { AiFillStar } from 'react-icons/ai';
import { CiStar } from 'react-icons/ci';
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { query_product } from '../store/reducers/homeReducer';

const SearchProducts = () => {


    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams()
    //const category = searchParams.get('category')

    const { products, categories, metadata } = useSelector(state => state.home);
    const [filter, setFilter] = useState(true);
    const [state, setState] = useState({ values: [0, 123456] });
    const [rating, setRating] = useState(null);
    const [styles, setStyles] = useState('grid');
    const [pageNumber, setPageNumber] = useState(1);
    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const [sort, setSort] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        const searchTerm = params.get('name') || '';

        console.log("🚀 ~ file: SearchProducts.jsx:36 ~ getQueryParams ~ searchTerm:", searchTerm);

        const category = params.get('category') || '';

        console.log("🚀 ~ file: SearchProducts.jsx:40 ~ getQueryParams ~ category:", category);

        return { searchTerm, category };
    };

  

    const buildQuery = () => {
        let query = `current=${pageNumber}&pageSize=10`;
        if (state.values) query += `&price>=${state.values[0]}&price<=${state.values[1]}`;
        if (searchValue) query += `&name=/${(searchValue)}/i`;
        if (categoriesSelected.length > 0) {
            categoriesSelected.forEach(category => {
                query += `&category=${category}`;
            });
        }
        if (rating) query += `&rating=${rating}`;
        if (sort) query += `&sort=${sort}`;
        
        return query;
    };

    useEffect(() => {
        const query = buildQuery();
        dispatch(query_product(query));
    }, [state, categoriesSelected, rating, pageNumber, sort,  searchValue]);

   


    const queryCategory = (e, value) => {
        if (e.target.checked) {
            setCategoriesSelected(prev => [...prev, value]);
        } else {
            setCategoriesSelected(prev => prev.filter(category => category !== value));
        }
    };

    return (
        <div>
            <Header />
            <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>Shop Page</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'>
                                    <IoIosArrowForward />
                                </span>
                                <span>Shop</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-16'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className={`md:block hidden ${!filter ? 'mb-6' : 'mb-0'}`}>
                        <button onClick={() => setFilter(!filter)} className='text-center w-full py-2 px-3 bg-indigo-500 text-white'>Filter Product</button>
                    </div>

                    <div className='w-full flex flex-wrap'>
                        <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0'}`}>
                            <h2 className='text-3xl font-bold mb-3 text-slate-600'>Category</h2>
                            <div className='py-2'>
                                {
                                    categories.map((c) => (
                                        <div key={c._id} className='flex justify-start items-center gap-2 py-1'>
                                            <input
                                                checked={categoriesSelected.includes(c._id)}
                                                onChange={(e) => queryCategory(e, c._id)}
                                                type="checkbox"
                                                id={c._id}
                                            />
                                            <label className='text-slate-600 block cursor-pointer' htmlFor={c._id}>{c.name}</label>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='py-2 flex flex-col gap-5'>
                                <h2 className='text-3xl font-bold mb-3 text-slate-600'>Price</h2>
                                <Range
                                    step={5}
                                    min={0}
                                    max={123456}
                                    values={state.values}
                                    onChange={(values) => setState({ values })}
                                    renderTrack={({ props, children }) => (
                                        <div
                                            {...props}
                                            style={{
                                                height: '6px',
                                                width: '100%',
                                                backgroundColor: '#ccc',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div
                                            {...props}
                                            style={{
                                                height: '20px',
                                                width: '20px',
                                                borderRadius: '50%',
                                                backgroundColor: '#000',
                                            }}
                                        />
                                    )}
                                />
                                <div className='flex justify-between'>
                                    <span>{state.values[0]}đ</span>
                                    <span>{state.values[1]}đ</span>
                                </div>
                            </div>

                            <div className='py-2 flex flex-col gap-5'>
                                <h2 className='text-3xl font-bold mb-3 text-slate-600'>Rating</h2>
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className='flex justify-start items-center gap-2 py-1'>
                                        <input
                                            onChange={() => setRating(star)}
                                            type="radio"
                                            id={`rating-${star}`}
                                            name="rating"
                                            value={star}
                                        />
                                        <label className='text-slate-600 block cursor-pointer' htmlFor={`rating-${star}`}>
                                            {Array.from({ length: star }, (_, index) => (
                                                <AiFillStar key={index} className='text-yellow-400' />
                                            ))}
                                            {Array.from({ length: 5 - star }, (_, index) => (
                                                <CiStar key={index} className='text-gray-400' />
                                            ))}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='w-full md:w-8/12 md-lg:w-8/12 flex flex-col'>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search products..."
                                className="border p-2"
                            />
                            <button onClick={() => { 
                                // Gọi API với giá trị tìm kiếm
                                const query = buildQuery(); 
                                dispatch(query_product(query)); 
                            }} className="bg-indigo-500 text-white p-2">
                                Search
                            </button>

                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
                                {products.length === 0 ? (
                                    <div>No products found for your search.</div>
                                ) : (
                                    products.map((product) => (
                                        <ShopProducts key={product._id} product={product} />
                                    ))
                                )}
                            </div>

                            {products.length > 0 && (
                                <Pagination
                                    pageSize={metadata.pageSize}
                                    current={metadata.currentPage}
                                    totalItems={metadata.totalItems}
                                    onPageChange={setPageNumber}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SearchProducts;
