import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';

import { CheckoutList, CheckoutPaypal, CheckoutStripeForm } from '@/components/checkout';
import { Meta } from '@/components/core';
import WithAuth from '@/components/core/WithAuth';
import { ErrorMessage, Container } from '@/components/ui';
import useCart from '@/hooks/cart/use-cart';
import styles from '@/styles/Checkout.module.css';
import calculateCartTotal from '@/utils/calculateCartTotal';
import { STRIPE_CLIENT_KEY } from '@/utils/constants';
import formatPrice from '@/utils/formatPrice';

// const stripePromise = loadStripe(STRIPE_CLIENT_KEY);

const Checkout = () => {
  const { data, error } = useCart();
  const cartItems = data ? data.items : [];
  const [isUpiChecked, setIsUpiChecked] = useState(0);
  const { cartTotal } = calculateCartTotal(cartItems);

  useEffect(() => {}, []);
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Meta title="Check Out" />
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <h2> Checkout Items </h2>
            <CheckoutList items={cartItems} />
            <div className={styles.paymentTotal}>
              <div className={styles.paymentWrapper}>
                <div className={styles.list}>
                  <div className={styles.label}> Sub Total </div>
                  <div className={styles.item}> {formatPrice(cartTotal)} </div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}> Total </div>
                  <div className={`${styles.item} ${styles.total}`}>{formatPrice(cartTotal)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <h2> Payment Method </h2>
            {/* <Elements stripe={stripePromise}><CheckoutStripeForm /></Elements> */}
            <div className={styles.withOr}>
              <span className={styles.line}></span> <span className={styles.middle}>or</span>
              <span className={styles.line}></span>
            </div>
            <CheckoutPaypal />
            <div className={styles.check_paymentMethod_card}>
              <div className={styles.check_paymentMethod_card_title}>Pay by UPI</div>
              <div className={styles.check_paymentMethod_card_subtitle}>
                20% Cashback in your MM Wallet
              </div>
              <div
                className={styles.check_out_payment_method}
                onClick={() => {
                  setIsUpiChecked(1);
                }}
              >
                <label
                  htmlFor="check-payment_method_gokwik_upi"
                  className={`${styles.check_payment_method_gokwik_upi} ${styles.check_payment_method_label}`}
                >
                  <img src="https://cdn.gokwik.co/logo/gokwik-upi-logo.gif" alt="Other UPI" />
                  <span>Pay by UPI through Gpay, Paytm and more</span>
                  <input
                    id="check-payment_method_gokwik_upi"
                    type="radio"
                    className={styles.check_input_radio}
                    name="check-payment_method"
                    data-discount="0"
                    value={isUpiChecked}
                  />
                </label>
                <div
                  className="check-payment_box payment_method_gokwik_upi"
                  style={{ display: isUpiChecked ? 'block' : 'none' }}
                >
                  <div className={styles.check_payment_box_payment_method_gokwik_upi_text}>
                    Pay securely using your favourite UPI app.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WithAuth(Checkout);
