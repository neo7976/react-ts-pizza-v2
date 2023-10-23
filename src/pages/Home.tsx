import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import items from "../assets/pizza.json";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {IProduct} from "../modals/products";
import axios from "axios";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState(0);

    // const [items, setItems] = useState<IProduct[]>([]);
    // useEffect(
    //     () => {
    //         setIsLoading(true)
    //         getPizzas()
    //         window.scrollTo(0, 0);
    //         //Обновляем при изменении categoryId, sortType
    //     }, [categoryId, sortType])

    // async function getPizzas() {
    //     const response = await axios.get<IProduct[]>('https://pizza-v2.free.beeceptor.com/pizzas');
    //     setItems(response.data)
    //     setIsLoading(false)
    // }

    const onChangeCategory = (categoryId: number) => {
        setCategoryId(categoryId)
        console.log(categoryId);
    }

    return (
        <div className={'container'}>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i: number) => onChangeCategory(i)}/>
                <Sort value={sortType} onChangeSort={(i: number) => setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(10)].map((_, index) => <PizzaBlockSkeleton key={index}/>)
                        : (items.map((items) =>
                            <PizzaBlock key={items.id} product={items}/>))
                }
            </div>
        </div>
    );
};

export default Home;
