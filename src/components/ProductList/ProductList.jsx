import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../Productitem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые', imageUrl: 'https://huarache-shop.ru/800/600/https/static.tildacdn.com/tild6437-3862-4530-b164-396231376362/kurtka.png'},
    {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая', imageUrl:'https://avatars.mds.yandex.net/i?id=93bd95f7552f26055c1a44ac9cf24ab1_l-4884623-images-thumbs&n=13'},
    {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые', imageUrl:'https://cdn1.ozone.ru/multimedia/1022652479.jpg'},
    {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая', imageUrl:'https://podwal.ru/upload/iblock/16a/16a577009096b5ff064e188da880fd90.png'},
    {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые', imageUrl:'https://cdn1.ozone.ru/s3/multimedia-6/6007479582.jpg'},
    {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая', imageUrl:'https://nazya.com/anyimage/img.alicdn.com/imgextra/i4/TB1b21wJpXXXXXxaXXXXXXXXXXX_!!0-item_pic.jpg'},
    {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые', imageUrl:'https://images.2moodstore.com/upload/iblock/a44/0jj4kz7fr534gmuxqgwsj0g274asjh1i.jpg?img_type=pmain'},
    {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', imageUrl:'https://img.joomcdn.net/00820917ca1b83014da7f7817324ff1545ee7433_original.jpeg'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;