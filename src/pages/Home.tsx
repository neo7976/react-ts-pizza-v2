import React, {FC, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import items from "../assets/pizza.json";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {IProduct, ISort} from "../modals/products";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Pagination from "../components/Pagination/Pagination";


interface HomeProps {
    search: string,
    setSearch: (value: (((prevState: string) => string) | string)) => void
}

const Home: FC<HomeProps> = ({search, setSearch}) => {
    const initSortType: ISort = {
        name: 'популярности',
        sortProperty: 'rating',
    }

    const [isLoading, setIsLoading] = useState(false);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState(initSortType);

    const [items, setItems] = useState<IProduct[]>([]);
    useEffect(
        () => {
            setIsLoading(true)
            getPizzas()
            window.scrollTo(0, 0);
            //Обновляем при изменении categoryId, sortType
        }, [categoryId, sortType, search.trim().length > 3])

    async function getPizzas() {
        // Попробовать сделать на сервере отправку данных по количеству страниц от запроса и настроить там тоже пагинацию
        const url: string = 'http://localhost:9004/'
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const startWithTitle = search.trim().length > 3 ? `startWithTitle=${search}` : ''
        const response = await axios.get<IProduct[]>(`${url}pizzas/?${category}&${startWithTitle}&sortBy=${sortType.sortProperty}&order=desc`);
        // const response = await axios.get<IProduct[]>(`${url}pizzas`);
        setItems(response.data)
        setIsLoading(false)
    }

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
            <Pagination/>
        </div>
    );
};

export default Home;
