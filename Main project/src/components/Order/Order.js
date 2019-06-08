import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return (
            <span 
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    border: '1px solid #ccc',
                    margin: '0 8px',
                    padding: '5px'
                }}
                key={ingredient.name} >
                {ingredient.name} ({ingredient.amount})
            </span>
        )
    });

    return (
        <div className={classes.Order} >
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>${props.price}</strong></p>
        </div>
    );
}

export default order;