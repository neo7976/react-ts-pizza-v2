import React, {FC, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import items from "../assets/pizza.json";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {IProduct, ISort, Root} from "../modals/products";
import axios from "axios";
import Pagination from "../components/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../hooks/hook";
import {setCategoryId} from "../redux/slices/filtersSlice";


interface HomeProps {
    search: string,
    setSearch: (value: (((prevState: string) => string) | string)) => void
}

function onChangeSort(setSortType: (value: (((prevState: ISort) => ISort) | ISort)) => void) {
    return (i: any) => setSortType(i);
}

const Home: FC<HomeProps> = ({search, setSearch}) => {
    const dispatch = useAppDispatch()


    const initSortType: ISort = {
        name: 'популярности',
        sortProperty: 'rating',
    }

    const [isLoading, setIsLoading] = useState(false);
    // const [categoryId, setCategoryId] = useState(0);
    const categoryId = useAppSelector((state) => state.filter.categoryId)
    const [sortType, setSortType] = useState(initSortType);
    const [currentPage, setCurrentPage] = useState(1);
    const [countPage, setCountPage] = useState(1);

    const [items, setItems] = useState<IProduct[]>([]);
    useEffect(
        () => {
            setIsLoading(true)
            getPizzas()
            window.scrollTo(0, 0);
            //Обновляем при изменении следующих данных
        }, [categoryId, sortType, search.trim().length > 3, currentPage])


    useEffect(
        () => {
            setCurrentPage(1);
        }, [categoryId, sortType, search.trim().length > 3])

    async function getPizzas() {
        // Попробовать сделать на сервере отправку данных по количеству страниц от запроса и настроить там тоже пагинацию
        const url: string = 'http://localhost:9004/'
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const startWithTitle = search.trim().length > 3 ? `startWithTitle=${search}` : ''
        const limit = `limit=${4}`
        const page = `page=${currentPage}`
        const response = await axios.get<Root>(`${url}pizzas/?${page}&${limit}&${category}&${startWithTitle}&sortBy=${sortType.sortProperty}&order=desc`);
        setItems(response.data.data);
        setCountPage(response.data.pageCount)
        setIsLoading(false)
    }

    const onChangeCategory = (categoryId: number) => {
        dispatch(setCategoryId(categoryId))
        setCurrentPage(1);
    }

    return (
        <div className={'container'}>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i: number) => onChangeCategory(i)}/>
                <Sort value={sortType} onChangeSort={onChangeSort(setSortType)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(4)].map((_, index) => <PizzaBlockSkeleton key={index}/>)
                        : (items.map((items) =>
                            <PizzaBlock key={items.id} product={items}/>))
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} countPage={countPage}/>
        </div>
    );
};

export default Home;
