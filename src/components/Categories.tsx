import React, {useState} from 'react';

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые"
    ]
    const onClickCategory = (activeIndex: number) => {
        setActiveIndex(activeIndex)
    }
    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        onClick={() => onClickCategory(index)}
                        className={activeIndex === index? 'active' : ''}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
