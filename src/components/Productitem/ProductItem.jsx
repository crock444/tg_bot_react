import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({ product, className, onAdd }) => {
    const redirectToPayment = () => {
        // Параметры для отправки на страницу оплаты
        const amount = product.price; // Сумма платежа
        const paymentUrl = 'https://example.com/payment'; // URL для отправки платежа (замените на реальный URL)

        // Создаем форму
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = paymentUrl;

        // Добавляем скрытое поле с суммой
        const amountField = document.createElement('input');
        amountField.type = 'hidden';
        amountField.name = 'amount';
        amountField.value = amount;
        form.appendChild(amountField);

        // Добавляем другие необходимые поля (например, id товара, описание и т.д.)
        const itemIdField = document.createElement('input');
        itemIdField.type = 'hidden';
        itemIdField.name = 'item_id';
        itemIdField.value = product.id; // Пример значения
        form.appendChild(itemIdField);

        // Добавляем форму в DOM и отправляем ее
        document.body.appendChild(form);
        form.submit();
    };

    return (
        <div className={`product ${className}`}>
            {/* Подложка */}
            <div className="shapewithtext"></div>

            <div className={'img'} onDoubleClick={() => { /* Открытие модального окна */ }}>
                <img src={product.imageUrl} alt={product.title} />
            </div>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price} руб</b></span>
            </div>

            <Button className={'add-btn'} onClick={redirectToPayment}>
                Купить
            </Button>

            {/* Модальное окно */}
            {false && ( // Замените на состояние модального окна
                <div className="modal-overlay">
                    <div className="modal-content">
                        <img src={product.imageUrl} alt={product.title} className="modal-image" />
                        <button className="modal-close">Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductItem;


