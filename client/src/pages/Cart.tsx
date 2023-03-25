import '../style.css';
import { useEffect, useState } from 'react';
import CartController from '../controllers/CartController';
import { CartProductModel } from '../models/CartProductModel';
import apiPath from '../api-path';

const Cart = () => {
    const [products, setProducts] = useState();
    const [quantity, setQuantity] = useState<number>();
    const [deleteItem, setDeleteItem] = useState<boolean>(false);
    useEffect(()=>{
        CartController.getAll().then((response)=>{
            setProducts(response.map((product: CartProductModel, i: number)=>{
                return(
                    <div className='cart__item' key={i}>
                        <div className='cart__item__img'>
                            <img src={`${apiPath}/${product.image}`} alt="" />
                        </div>
                        <div className='cart__item__title'>{product.title}</div>
                        <div className='cart__item__quantity'>
                            <button className='cart__plus__minus__buttons' onClick={()=>setQuantity(CartController.subQuantity(i))}>-</button>
                            <span>{product.quantity}</span>
                            <button className='cart__plus__minus__buttons' onClick={()=>setQuantity(CartController.addQuantity(i))}>+</button>
                        </div>
                        <div className='cart__item__price'>
                            {product.full_price} ₽
                        </div>
                        <div className='cart__item__actions'>
                            <button onClick={()=>{setDeleteItem(CartController.deleteFromCart(i)); setTimeout(()=>{setDeleteItem(false)}, 100);}}>
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className='delete__icon' d="M2.33325 7.00004H25.6666M11.6666 12.8334V18.6667M16.3333 12.8334V18.6667M4.66659 7.00004H23.3333L21.4899 23.59C21.4267 24.161 21.1552 24.6885 20.7272 25.0717C20.2993 25.4549 19.745 25.6667 19.1706 25.6667H8.82925C8.25483 25.6667 7.70057 25.4549 7.27262 25.0717C6.84468 24.6885 6.57311 24.161 6.50992 23.59L4.66659 7.00004ZM8.56909 3.67154C8.7578 3.27134 9.05641 2.93304 9.43009 2.6961C9.80377 2.45917 10.2371 2.33337 10.6796 2.33337H17.3203C17.7629 2.33315 18.1965 2.45884 18.5704 2.69579C18.9443 2.93274 19.2431 3.27116 19.4319 3.67154L20.9999 7.00004H6.99992L8.56909 3.67154Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                );
            }));
        });
    }, [quantity, deleteItem]);
    return(
        <div className='cart__page'>
            <div className='cart__products'>
                <h1>Корзина</h1>
                {products}
            </div>
            <div className='cart__order'>

            </div>
        </div>
    );
}

export default Cart;