import { Link } from 'gatsby';
import React, { useEffect } from 'react';

import Brand from '../components/Brand';
import CartItem from '../components/CartItem';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Icon from '../components/Icons/Icon';
import OrderSummary from '../components/OrderSummary';

import * as styles from './cart.module.css';

import { pushToDataLayer } from '../helpers/tracking';

const CartPage = (props) => {
  const sampleCartItem = {
    image: '/products/pdp1.jpeg',
    alt: '',
    name: 'Lambswool Crew Neck Jumper',
    price: 220,
    color: 'Anthracite Melange',
    size: 'XS',
  };
  
const cartItems = [
  sampleCartItem,
  sampleCartItem,
];

useEffect(() => {
  pushToDataLayer('view_cart', {
    currency: 'USD',
    value: 440,
    items: cartItems.map((item, index) => ({
      item_id: `lambswool_crew_neck_jumper_${index + 1}`,
      item_name: item.name,
      item_category: 'Sweaters',
      item_variant: `${item.color} / ${item.size}`,
      price: item.price,
      quantity: 1,
    })),
  });
}, []);
  return (
    <div>
      <div className={styles.contentContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.headerContainer}>
            <div className={styles.shoppingContainer}>
              <Link className={styles.shopLink} to={'/shop'}>
                <Icon symbol={'arrow'}></Icon>
                <span className={styles.continueShopping}>
                  Continue Shopping
                </span>
              </Link>
            </div>
            <Brand />
            <div className={styles.loginContainer}>
              <Link to={'/login'}>Login</Link>
            </div>
          </div>
          <div className={styles.summaryContainer}>
            <h3>My Bag</h3>
            <div className={styles.cartContainer}>
              <div className={styles.cartItemsContainer}>
                <CartItem {...sampleCartItem} />
                <CartItem {...sampleCartItem} />
              </div>
              <OrderSummary />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
