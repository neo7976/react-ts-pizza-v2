import './scss/app.scss'
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import items from './assets/pizza.json'
import axios from "axios";
import {IProduct} from "./modals/products";
import {useEffect, useState} from "react";

function App() {
    // const [items, setItems] = useState<IProduct[]>([]);
    // useEffect(
    //     () => {
    //         getPizzas()
    //     }, [])
    //
    // async function getPizzas() {
    //     const response = await axios.get<IProduct[]>('https://pizza-v2.free.beeceptor.com/pizzas');
    //     setItems(response.data)
    // }

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            items.map((items) => (<PizzaBlock key={items.id} product={items}/>))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;