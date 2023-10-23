import React, {FC, useState} from 'react';

interface CategoriesProps {
    value: number,
    onChangeCategory: (i: number) => void
}

const Categories: FC<CategoriesProps> = ({value, onChangeCategory}) => {
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые"
    ]

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => (
                    <li
                        key={index}
                        onClick={() => onChangeCategory(index)}
                        className={value === index ? 'active' : ''}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
