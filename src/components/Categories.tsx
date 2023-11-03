import React, {FC, useState} from 'react';
import {setCategoryId, setCurrentPage} from "../redux/slices/filtersSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hook";

const Categories: FC = () => {
    const onChangeCategory = (categoryId: number) => {
        dispatch(setCategoryId(categoryId))
        dispatch(setCurrentPage(1));
    }

    const dispatch = useAppDispatch();
    const categoryId = useAppSelector((state) => state.filter.categoryId)
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
                        className={categoryId === index ? 'active' : ''}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
