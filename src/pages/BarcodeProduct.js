import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card/Card';
import CardBar from '../components/Card/CardBar';

const BarcodeProduct = () => {
    const { barcode } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
                const data = await response.json();

                if (data.status === 1) {
                    setProduct({
                        title: data.product.product_name || 'No name available',
                        ingredients: data.product.ingredients_text_en || 'No ingredients available',
                        imageUrl: data.product.image_url || '/assets/placeholder.jpg',
                        nutritionGrade: data.product.nutrition_grades || 'N/A',
                        category: data.product.categories_tags ? data.product.categories_tags[0] : 'No categories available',
                    });
                } else {
                    setError('Product not found.');
                }
            } catch (err) {
                setError('An error occurred while fetching the product data.');
            }
        };

        fetchProduct();
    }, [barcode]);

    return (
        <div>
            {error && <p>{error}</p>}
            {product && <CardBar product={product} />}
        </div>
    )
}

export default BarcodeProduct;