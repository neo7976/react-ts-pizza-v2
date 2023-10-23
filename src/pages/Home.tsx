import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import items from "../assets/pizza.json";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {IProduct, ISort} from "../modals/products";
import axios from "axios";

const Home = () => {
    const initSortType: ISort = {
        name: 'популярности',
        sortProperty: 'rating'
    }

    const [isLoading, setIsLoading] = useState(false);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState(initSortType);

    // const [items, setItems] = useState<IProduct[]>([]);
    // useEffect(
    //     () => {
    //         setIsLoading(true)
    //         getPizzas()
    //         window.scrollTo(0, 0);
    //         //Обновляем при изменении categoryId, sortType
    //     }, [categoryId, sortType])

    // async function getPizzas() {
    // const url = 'https://pizza-v2.free.beeceptor.com/'
    // const response = await axios.get<IProduct[]>(`${url}pizzas?
    // ${categoryId > 0 ? `category=${categoryId}` : ''}
    // &sortBy=${sortType.sortProperty}&order=desc`);
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
                <Sort value={sortType} onChangeSort={(i: any) => setSortType(i)}/>
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
