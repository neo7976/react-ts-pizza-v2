import React, {FC, useEffect, useState} from 'react';
import qs from 'qs'
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import pizzaJson from "../assets/pizza.json";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {IProduct, ISort, Root} from "../modals/products";
import axios from "axios";
import Pagination from "../components/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../hooks/hook";
import {useNavigate} from "react-router-dom";
import {setCountPage, setCurrentPage, setFilters} from "../redux/slices/filtersSlice";

const Home: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {categoryId, sort, currentPage, searchValue:search} = useAppSelector((state) => state.filter)

    const [items, setItems] = useState<IProduct[]>([]);

    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1));
    //         console.log(params);
    //
    //         const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
    //         dispatch(setFilters({
    //             ...params, sort
    //         }))
    //     }
    // }, [])


    useEffect(
        () => {
            setIsLoading(true)
            getPizzas()
            window.scrollTo(0, 0);
            //Обновляем при изменении следующих данных
        }, [categoryId, sort.sortProperty, search, currentPage])


    useEffect(
        () => {
            dispatch(setCurrentPage(1));
        }, [categoryId, sort.sortProperty, search])

    useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId: categoryId,
            currentPage: currentPage,
        });

        navigate(`?${queryString}`);
    }, [categoryId, sort.sortProperty, search, currentPage]);


    async function getPizzas() {
        // Попробовать сделать на сервере отправку данных по количеству страниц от запроса и настроить там тоже пагинацию
        const url: string = 'http://localhost:9004/'
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const startWithTitle = search.trim() !== '' ? `startWithTitle=${search}` : ''
        const limit = `limit=${4}`
        const page = `page=${currentPage}`
        const response = await axios.get<Root>(`${url}pizzas/?${page}&${limit}&${category}&${startWithTitle}&sortBy=${sort.sortProperty}&order=desc`);
        setItems(response.data.data);
        dispatch(setCountPage(response.data.pageCount))
        setIsLoading(false)
    }


    return (
        <div className={'container'}>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(4)].map((_, index) => <PizzaBlockSkeleton key={index}/>)
                        : (items.map((items) =>
                            <PizzaBlock key={items.id} product={items}/>))
                }
            </div>
            <Pagination/>
        </div>
    );
};

export default Home;
