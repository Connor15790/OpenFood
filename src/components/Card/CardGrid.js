import React from 'react'
import Card from './Card'
import styles from "./Card.module.css"

const CardGrid = ({ products }) => {
    return (
        <div className={styles.gridContainer}>
            {products.map((product, index) => (
                <Card
                    key={index}
                    title={product.title}
                    ingredients={product.ingredients}
                    imageUrl={product.imageUrl}
                    category={product.category}
                    nutritionGrade={product.nutritionGrade}
                />
            ))}
        </div>
    )
}

export default CardGrid