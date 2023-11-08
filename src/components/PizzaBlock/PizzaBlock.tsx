import React, {FC, useState} from 'react';
import {IProduct} from "../../modals/products";
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {CartItem} from "../../redux/slices/cart/types";
import {addItem} from "../../redux/slices/cart/cartSlice";

interface PizzaBlockProps {
    product: IProduct
}

const PizzaBlock: FC<PizzaBlockProps> = ({product}) => {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) => state.cart.items.find((item) => item.id === product.id))
    const [activeSize, setActiveSize] = useState(0);
    const [activeType, setActiveType] = useState(0);
    const typeNames = ['Тонкое', 'Традиционное']

    //подумать, как сделать изменения под разные размеры и типы пицц, чтобы показывался свой счётчик
    const addedCount = cartItem ? cartItem.count : 0;

    const onClickAdd = () => {
        const item: CartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
            type: typeNames[activeType],
            size: product.sizes[activeSize],
            count: 0
        };
        dispatch(addItem(item));
    }

    return (
        <div className='pizza-block-wrapper'>
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={product.imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{product.title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {product.types.map(typeId => (
                            <li
                                key={typeId}
                                onClick={() => setActiveType(typeId)}
                                className={activeType === typeId ? 'active' : ''}>
                                {typeNames[typeId]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {product.sizes.map((size, index) => (
                            <li
                                key={index}
                                onClick={() => setActiveSize(index)}
                                className={activeSize === index ? 'active' : ''}>
                                {size} см.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {product.price} ₽</div>
                    <button
                        onClick={onClickAdd}
                        className="button button--outline button--add"
                    >
                        <div>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                    fill="white"
                                />
                            </svg>
                            <span>Добавить</span>
                            {addedCount > 0 && <i>{addedCount}</i>}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;
