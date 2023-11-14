import React, {FC, useEffect} from 'react';
import qs from 'qs'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
// import pizzaJson from "../assets/pizza.json";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {fetchPizzas} from '../redux/slices/pizza/pizzaSlice'
import Pagination from "../components/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../hooks/hook";
import {useNavigate} from "react-router-dom";
import {setCurrentPage} from "../redux/slices/filtersSlice";
import {StatusLoading} from "../redux/slices/pizza/types";

const Home: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false);
    //добавление поиска в url
    const isMounted = React.useRef(false);

    const {categoryId, sort, currentPage, searchValue: search} = useAppSelector((state) => state.filter)
    const {status, items} = useAppSelector((state) => state.pizza)

    // Если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId: categoryId,
                currentPage: currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);

    //Если был первый рендер, по проверяем url параметры и сохраняем в Redux (надо пофиксить, пока не работает)
    // React.useEffect(() => {
    //   if (window.location.search) {
    //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
    //     const sort = sortList.find((obj) => obj?.sortProperty === params.sortProperty);
    //       console.log(sort);
    //       dispatch(
    //       setFilters({
    //         searchValue: params.search,
    //         categoryId: params.category,
    //         currentPage: params.currentPage,
    //         sort: sort
    //       }),
    //     );
    //       console.log(params);
    //   }
    // }, []);


    useEffect(
        () => {
            // setIsLoading(true)
            window.scrollTo(0, 0);
            if (!isSearch.current) {
                getPizzas();
            }
            isSearch.current = false;
            //Обновляем при изменении следующих данных
        }, [categoryId, sort.sortProperty, search, currentPage])


    useEffect(
        () => {
            dispatch(setCurrentPage(1));
        }, [categoryId, sort.sortProperty, search])


    async function getPizzas() {
        const url: string = 'http://localhost:9004/'
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const startWithTitle = search.trim() !== '' ? `startWithTitle=${search}` : ''
        const limit = `limit=${4}`
        const page = `page=${currentPage}`
        const sortBy = sort.sortProperty;

        dispatch(fetchPizzas({
            url,
            sortBy,
            category,
            startWithTitle,
            limit,
            page,
        }))
    }


    return (
        <div className={'container'}>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === StatusLoading.ERROR ?
                    (<div className='content__error-info'>
                        <h2>Произошла ошибка 🧐</h2>
                        <p>
                           К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже
                        </p>
                    </div>) : (<div className="content__items">
                        {
                            (status === StatusLoading.LOADING) ? [...new Array(4)].map((_, index) => <PizzaBlockSkeleton
                                    key={index}/>)
                                : (items.map((item) =>
                                    <PizzaBlock key={item.id} product={item}/>))
                        }
                    </div>)
            }

            <Pagination/>
        </div>
    );
};

export default Home;
