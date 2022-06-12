import Router from 'next/router';
import Script from 'next/script';
import React, { useRef, useEffect, useState } from 'react';

import { useToast } from '@/contexts';
import { CheckOutService } from '@/services';
import { PAYPAL_CLIENT_ID } from '@/utils/constants';

import styles from './CheckoutPaypal.module.css';
import checkCanMakePayment from './CheckCanMakePayment';
import showPaymentUI from './ShowPaymentUI';

declare const window: Window &
  typeof globalThis & {
    paypal: any;
  };

interface ErrorMsg {
  message: string;
}

interface PaypalData {
  orderID: string;
}

const CheckoutPaypal = () => {
  const [sdkReady, setSdkReady] = useState(false);

  const paypalButtonsRef = useRef<HTMLDivElement>(null);
  const { setToast } = useToast();
  // Create order detail data.
  const details = {
    total: {
      label: 'Total',
      amount: {
        currency: 'INR',
        value: '10.01', // sample amount
      },
    },
    displayItems: [
      {
        label: 'Original Amount',
        amount: {
          currency: 'INR',
          value: '10.01',
        },
      },
    ],
  };

  // Create supported payment method.
  const supportedInstruments = [
    {
      supportedMethods: ['https://tez.google.com/pay'],
      data: {
        pa: 'merchant-vpa@xxx',
        pn: 'Merchant Name',
        tr: '1234ABCD', // Your custom transaction reference ID
        url: 'https://url/of/the/order/in/your/website',
        mc: '1234', //Your merchant category code
        tn: 'Purchase in Merchant',
      },
    },
  ];
  useEffect(() => {
    /** Launches payment request flow when user taps on buy button. */
    function onBuyClicked() {
      if (!window.PaymentRequest) {
        console.log('Web payments are not supported in this browser.');
        return;
      }

      // Create payment request object.
      let request: any = null;
      try {
        /*@ts-ignore*/
        request = new PaymentRequest(supportedInstruments, details);
      } catch (e) {
        console.log('Payment Request Error: ' + e.message);
        return;
      }
      if (!request) {
        console.log('Web payments are not supported in this browser.');
        return;
      }

      var canMakePaymentPromise = checkCanMakePayment(request);
      canMakePaymentPromise
        .then((result) => {
          showPaymentUI(request, result);
        })
        .catch((err) => {
          console.log('Error calling checkCanMakePayment: ' + err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkReady]);

  const handleLoad = () => {
    setSdkReady(true);
  };

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=PHP`}
        onLoad={handleLoad}
      ></Script>
      <div className={styles.paypal} ref={paypalButtonsRef} />
    </>
  );
};

export default CheckoutPaypal;
