import React, { useState } from 'react';
import productContext from './productContext';
import axios from 'axios';

const ProductState = (props) => {
    const productsInitial = [];

    const [products, setProducts] = useState(productsInitial);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [categories, setCategories] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchProducts = async () => {
        try {
            const response = await fetch(`https://world.openfoodfacts.org/api/v0/search.json?fields=product_name,ingredients_text_en,image_url,categories_tags,nutrition_grades&page_size=20&page=${page}`);
            const data = await response.json();

            if (data.products.length === 0) {
                setHasMore(false);
            }

            setProducts(prevData => [
                ...prevData,
                ...data.products.map(product => ({
                    title: product.product_name || 'No Title',
                    ingredients: product.ingredients_text_en || 'No description available',
                    imageUrl: product.image_url || 'path/to/default-image.jpg',
                    category: product.categories_tags ? product.categories_tags[0] : 'No category available',
                    nutritionGrade: product.nutrition_grades || 'N/A',
                }))
            ]);

            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('https://world.openfoodfacts.org/categories.json');
            setCategories(response.data.tags); // Categories are in 'tags'
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSortName = () => {
        const sortedProducts = [...products].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
        setProducts(sortedProducts);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSortNutri = () => {
        const sortedProducts = [...products].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.nutritionGrade.localeCompare(b.nutritionGrade);
            } else {
                return b.nutritionGrade.localeCompare(a.nutritionGrade);
            }
        });
        setProducts(sortedProducts);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <productContext.Provider value={{ products, loading, categories, hasMore, fetchProducts, fetchCategories, handleSortName, sortOrder, handleSortNutri }}>
            {props.children}
        </productContext.Provider>
    )
}

export default ProductState;