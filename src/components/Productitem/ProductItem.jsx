import React, { useState } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';


const ProductItem = ({ product, className, onAdd }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const onAddHandler = () => {
        onAdd(product);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000); // Длительность анимации
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`product ${className}`}>
            {/* Подложка */}
            <div className={`shapewithtext ${isAnimating ? 'animate-shadow' : ''}`}></div>

            <div className={'img'} onDoubleClick={openModal}>
                <img src={product.imageUrl} alt={product.title} />
            </div>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price} руб</b></span>
            </div>

            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>

            {/* Модальное окно */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <img src={product.imageUrl} alt={product.title} className="modal-image" />
                        <button className="modal-close" onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductItem;

