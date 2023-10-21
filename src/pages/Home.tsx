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

    // const [items, setItems] = useState<IProduct[]>([]);
    // useEffect(
    //     () => {
    //         setIsLoading(true)
    //         getPizzas()
    //     }, [])
    //
    // async function getPizzas() {
    //     const response = await axios.get<IProduct[]>('https://pizza-v2.free.beeceptor.com/pizzas');
    //     setItems(response.data)
    //     setIsLoading(false)
    // }

    return (
        <>
                <div className="content__top">
                    <Categories/>
                    <Sort/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {
                        isLoading ? [...new Array(10)].map((_, index) => <PizzaBlockSkeleton key={index}/>)
                            : (items.map((items) =>
                                <PizzaBlock key={items.id} product={items}/>))
                    }
                </div>
        </>
    );
};

export default Home;
