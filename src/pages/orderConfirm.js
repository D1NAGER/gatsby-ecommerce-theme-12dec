import React, { useEffect } from 'react';
import * as styles from './accountSuccess.module.css';

import ActionCard from '../components/ActionCard';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';

import { pushToDataLayer } from '../helpers/tracking';



const OrderConfirmPage = (props) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const alreadyTracked = sessionStorage.getItem('demo_purchase_tracked');

    if (alreadyTracked) return;

    pushToDataLayer('purchase', {
      transaction_id: `demo_order_${Date.now()}`,
      currency: 'USD',
      value: 440,
      tax: 0,
      shipping: 0,
      items: [
        {
          item_id: 'lambswool_crew_neck_jumper_001',
          item_name: 'Lambswool Crew Neck Jumper',
          item_category: 'Sweaters',
          item_variant: 'Anthracite Melange / XS',
          price: 220,
          quantity: 2,
        },
      ],
    });

    sessionStorage.setItem('demo_purchase_tracked', 'true');
  }, []);


  
  return (
    <Layout disablePaddingBottom>
      <Container size={'medium'}>
        <div className={styles.root}>
          <h1>Thank You!</h1>
          <p>
            We are now processing your order. If you have any concerns feel free
            to email us at customerservice@example.com
          </p>
          <div className={styles.actionContainer}>
            <ActionCard
              title={'Order Status'}
              icon={'delivery'}
              subtitle={'Check your order status'}
              link={'/account/orders'}
              size={'lg'}
            />

            <ActionCard
              title={'Shop'}
              icon={'bag'}
              subtitle={'Continue Shopping'}
              link={'/shop'}
            />

            <ActionCard
              title={'FAQs'}
              icon={'question'}
              subtitle={'Check out FAQs page'}
              link={'/faq'}
            />

            <ActionCard
              title={'Contact Us'}
              icon={'phone'}
              subtitle={'Reach out to us'}
              link={'/support#contact'}
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default OrderConfirmPage;
