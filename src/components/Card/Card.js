import React from 'react'
import styles from "./Card.module.css"
import { useNavigate } from 'react-router-dom';

const Card = ({ title, ingredients, imageUrl, category, nutritionGrade, productsBar }) => {
    const navigate = useNavigate();

    function capitalize(str) {
        if (!str) return ""; // Return an empty string if str is undefined or empty
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (productsBar) {
        return (
            <div className={styles.card} onClick={() => {
                navigate("/productpage", { state: { productImage: productsBar.imageUrl, productTitle: productsBar.title, productIngredients: String(productsBar.ingredients).length > 80
                    ? capitalize(String(productsBar.ingredients).slice(0, 80)) + "..."
                    : capitalize(String(productsBar.ingredients)), productCategory: productsBar.category.slice(3).charAt(0).toUpperCase() + productsBar.category.slice(4), productNutrition: productsBar.nutritionGrade } })
            }}>
                <img src={productsBar.imageUrl} alt={title} className={styles.cardImage} />
                <div className={styles.cardContent}>
                    <p style={{ fontWeight: "bold", textAlign: "center", fontSize: "20px", color: "black" }}>{productsBar.title.length > 20 ? productsBar.title.slice(0, 15) + "..." : productsBar.title}</p>
                    <div style={{ height: "40%", display: "flex", flexDirection: "column", justifyContent: "start", marginBottom: "15px" }}>
                        <p style={{ paddingTop: "10px", textAlign: "left" }}><strong style={{ fontSize: "16px" }}>Ingredients:</strong> {String(productsBar.ingredients).length > 80
                            ? capitalize(String(productsBar.ingredients).slice(0, 80)) + "..."
                            : capitalize(String(productsBar.ingredients))}</p>
                        <p style={{ paddingTop: "10px" }}><strong style={{ fontSize: "16px" }}>Category:</strong> {productsBar.category.slice(3).charAt(0).toUpperCase() + productsBar.category.slice(4)}</p>
                        <p style={{ paddingTop: "10px" }}><strong style={{ fontSize: "16px" }}>Nutrition Grade:</strong> {productsBar.nutritionGrade.toUpperCase()}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.card} onClick={() => {
                navigate("/productpage", { state: { productImage: imageUrl, productTitle: title, productIngredients: String(ingredients).length > 80
                    ? capitalize(String(ingredients).slice(0, 80)) + "..."
                    : capitalize(String(ingredients)), productCategory: category.slice(3).charAt(0).toUpperCase() + category.slice(4), productNutrition: nutritionGrade } })
            }}>
                <img src={imageUrl} alt={title} className={styles.cardImage} />
                <div className={styles.cardContent}>
                    <p style={{ fontWeight: "bold", textAlign: "center", fontSize: "20px", color: "black" }}>{title.length > 20 ? title.slice(0, 15) + "..." : title}</p>
                    <div style={{ height: "40%", display: "flex", flexDirection: "column", justifyContent: "start", marginBottom: "15px" }}>
                        <p style={{ paddingTop: "10px", textAlign: "left" }}><strong style={{ fontSize: "16px" }}>Ingredients:</strong> {String(ingredients).length > 80
                            ? capitalize(String(ingredients).slice(0, 80)) + "..."
                            : capitalize(String(ingredients))}</p>
                        <p style={{ paddingTop: "10px" }}><strong style={{ fontSize: "16px" }}>Category:</strong> {category.slice(3).charAt(0).toUpperCase() + category.slice(4)}</p>
                        <p style={{ paddingTop: "10px" }}><strong style={{ fontSize: "16px" }}>Nutrition Grade:</strong> {nutritionGrade.toUpperCase()}</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default Card