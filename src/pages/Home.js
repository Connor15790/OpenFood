import React, { useEffect, useState, useContext, useRef } from 'react'
import Navbar from '../components/Navbar/Navbar';
import CardGrid from '../components/Card/CardGrid';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner/Spinner';
import productContext from '../context/products/productContext';
import styles from "./Home.module.css"
import SearchIcon from '@mui/icons-material/Search';
import Dropdown from 'react-bootstrap/Dropdown';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

import { useNavigate } from 'react-router-dom';

const Home = () => {
    const context = useContext(productContext);
    const navigate = useNavigate();

    const { products, hasMore, fetchProducts, fetchCategories, categories, handleSortName, sortOrder, handleSortNutri } = context;

    const [searchQuery, setSearchQuery] = useState('');
    const [barcode, setBarcode] = useState('');
    const [error, setError] = useState(null);

    const [productsSort, setproductsSort] = useState(null);
    const [sortOrder2, setSortOrder2] = useState('asc');

    const hasFetchedProducts = useRef(false);
    const hasFetchedCategories = useRef(false);

    // Fetch products only if not already fetched
    useEffect(() => {
        if (!hasFetchedProducts.current) {
            fetchProducts();
            hasFetchedProducts.current = true;
        }
    }, [fetchProducts]);

    // Fetch categories only if not already fetched
    useEffect(() => {
        if (!hasFetchedCategories.current) {
            fetchCategories();
            hasFetchedCategories.current = true;
        }
    }, [fetchCategories]);

    const filteredProducts = products.filter(product =>
        product && product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onChange = (e) => {
        setBarcode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (barcode === '') {
            setError('Please enter a barcode.');
            return;
        }

        navigate(`/productbarcode/${barcode}`);
    };

    const handleCategoryClick = (categoryName) => {
        console.log('Selected Category:', categoryName);
        setproductsSort(products.filter(product =>
            product && product.category && product.category.toLowerCase().includes(categoryName.toLowerCase())
        ));
    };

    return (
        <div className={styles.container}>
            <Navbar products={filteredProducts} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div className={styles.searchcontainer}>
                <form className={styles.searchbar} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search by Barcode"
                        value={barcode}
                        onChange={onChange}
                        className={styles.searchinput}
                    />
                    <button type="submit" className={styles.searchbutton}>
                        <SearchIcon style={{ display: "flex", alignItems: "center" }} />
                    </button>

                    <Dropdown className={`${styles.dropdowncontainer}`}>
                        <Dropdown.Toggle className={styles.dropdown} variant="light" id="dropdown-basic">
                            <span className='pe-2'>Sort</span>
                            <SwapVertIcon />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={handleSortName}>
                                <span>By Name</span>
                                {sortOrder === "asc" ? <NorthIcon style={{ height: "17px" }} /> : <SouthIcon style={{ height: "17px" }} />}
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={handleSortNutri}>
                                <span>By Nutrition</span>
                                {sortOrder2 === "asc" ? <NorthIcon style={{ height: "17px" }} /> : <SouthIcon style={{ height: "17px" }} />}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className={`${styles.dropdowncontainer}`}>
                        <Dropdown.Toggle className={styles.dropdown} variant="light" id="dropdown-basic">
                            <span className='pe-2'>Categories</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {categories.slice(0, 10).map((category) => (
                                <Dropdown.Item
                                    key={category.id}
                                    href={`#/category/${category.id}`}
                                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                    onClick={() => handleCategoryClick(category.name)}
                                >
                                    <span>{category.name}</span>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </form>
            </div>

            <InfiniteScroll
                dataLength={products.length}
                next={fetchProducts}
                hasMore={hasMore}
                loader={<Spinner />}
                endMessage={<p>No more items to load.</p>}
            >
                {productsSort ? <CardGrid products={productsSort} /> : <CardGrid products={filteredProducts} />}
            </InfiniteScroll>
        </div>
    );
};


export default Home;