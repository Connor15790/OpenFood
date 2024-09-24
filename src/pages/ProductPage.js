import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar';
import styles from "./ProductPage.module.css"
import styles2 from "../components/Navbar/Navbar.module.css"

const ProductPage = () => {
    const location = useLocation();
    const productImage = location.state?.productImage;
    const productTitle = location.state?.productTitle;
    const productIngredients = location.state?.productIngredients;
    const productCategory = location.state?.productCategory;
    const productNutrition = location.state?.productNutrition;

    return (
        <div className={styles.container}>
            <div className={styles2.container}>
                <div className={styles2.logoandname}>
                    <img src="/assets/off.png" height="100px" alt="logo" />
                </div>
            </div>

            <div className={styles.pageContainer}>
                <div className={styles.imageContainer}>
                    <img src={productImage} alt={productImage} className={styles.cardImage} />
                </div>
                <div className={styles.infoContainer}>
                    <h1 className={styles.title}>{productTitle}</h1>
                    <div className={styles.subContainer}>
                        <p className={styles.category}>Category: <span style={{ fontWeight: "lighter", fontSize: "18px" }}>{productCategory}</span></p>
                        <p className={styles.category}>Ingredients: <span style={{ fontWeight: "lighter", fontSize: "18px" }}>{productIngredients}</span></p>
                        <p className={styles.category}>Nutrition Grade: <span style={{ fontWeight: "lighter", fontSize: "18px" }}>{productNutrition.toUpperCase()}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage