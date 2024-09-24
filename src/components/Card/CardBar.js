import React from 'react'
import styles from "./CardBar.module.css"
import styles2 from "../Navbar/Navbar.module.css"
import { useNavigate } from 'react-router-dom'

const CardBar = ({ product }) => {
    const navigate = useNavigate();

    function capitalize(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            <div className={styles2.container}>
                <div className={styles2.logoandname}>
                    <img src="/assets/off.png" height="100px" alt="logo" />
                </div>
            </div>

            <div className={styles.gridContainer}>
                <div className={styles.card} onClick={() => {
                    navigate("/productpage", {
                        state: {
                            productImage: product.imageUrl, productTitle: product.title, productIngredients: String(product.ingredients).length > 80
                                ? capitalize(String(product.ingredients).slice(0, 80)) + "..."
                                : capitalize(String(product.ingredients)), productCategory: product.category.slice(3).charAt(0).toUpperCase() + product.category.slice(4), productNutrition: product.nutritionGrade
                        }
                    })
                }}>
                    <img src={product.imageUrl} alt={product.title} className={styles.cardImage} />
                    <div className={styles.cardContent}>
                        <p style={{ fontWeight: "bold", textAlign: "center", fontSize: "20px", color: "black" }}>{product.title.length > 20 ? product.title.slice(0, 15) + "..." : product.title}</p>
                        <div style={{ height: "40%", display: "flex", flexDirection: "column", justifyContent: "start", marginBottom: "15px" }}>
                            <p style={{ paddingTop: "10px", textAlign: "left" }}><strong style={{ fontSize: "16px" }}>Ingredients:</strong> {String(product.ingredients).length > 80
                                ? capitalize(String(product.ingredients).slice(0, 80)) + "..."
                                : capitalize(String(product.ingredients))}</p>
                            <p style={{ paddingTop: "10px" }}><strong style={{ fontSize: "16px" }}>Category:</strong> {product.category.slice(3).charAt(0).toUpperCase() + product.category.slice(4)}</p>
                            <p style={{ paddingTop: "10px" }}><strong style={{ fontSize: "16px" }}>Nutrition Grade:</strong> {product.nutritionGrade.toUpperCase()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardBar