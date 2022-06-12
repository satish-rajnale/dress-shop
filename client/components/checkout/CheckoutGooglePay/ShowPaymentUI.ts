/**
 * Show the payment request UI.
 *
 * @private
 * @param {PaymentRequest} request The payment request object.
 * @param {Promise} canMakePayment The promise for whether can make payment.
 */
export default function showPaymentUI(request: any, canMakePayment: any) {
  if (!canMakePayment) {
    handleNotReadyToPay();
    return;
  }

  // Set payment timeout.
  let paymentTimeout = window.setTimeout(function () {
    window.clearTimeout(paymentTimeout);
    request
      .abort()
      .then(function () {
        console.log('Payment timed out after 20 minutes.');
      })
      .catch(function () {
        console.log('Unable to abort, user is in the process of paying.');
      });
  }, 20 * 60 * 1000); /* 20 minutes */

  request
    .show()
    .then(function (instrument: any) {
      window.clearTimeout(paymentTimeout);
      processResponse(instrument); // Handle response from browser.
    })
    .catch(function (err: any) {
      console.log(err);
    });
}

/**
 * Process the response from browser.
 *
 * @private
 * @param {PaymentResponse} instrument The payment instrument that was authed.
 */
function processResponse(instrument: any) {
  /*@ts-ignore*/
  var instrumentString = instrumentToJsonString(instrument);
  console.log(instrumentString);

  fetch('/buy', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: instrumentString,
  })
    .then(function (buyResult) {
      if (buyResult.ok) {
        return buyResult.json();
      }
      console.log('Error sending instrument to server.');
    })
    .then(function (buyResultJson) {
      completePayment(instrument, buyResultJson.status, buyResultJson.message);
    })
    .catch(function (err) {
      console.log('Unable to process payment. ' + err);
    });
}

/**
 * Notify browser that the instrument authorization has completed.
 *
 * @private
 * @param {PaymentResponse} instrument The payment instrument that was authed.
 * @param {string} result Whether the auth was successful. Should be either
 * 'success' or 'fail'.
 * @param {string} msg The message to log in console.
 */
function completePayment(instrument: any, result: any, msg: any) {
  instrument
    .complete(result)
    .then(function () {
      console.log('Payment succeeds.');
      console.log(msg);
    })
    .catch(function (err: any) {
      console.log(err);
    });
}

/** Handle Google Pay not ready to pay case. */
function handleNotReadyToPay() {
  alert('Google Pay is not ready to pay.');
}

function paymentResponseToJsonString(paymentResponse: any) {
  // PaymentResponse is an interface, JSON.stringify works only on dictionaries.
  var paymentResponseDictionary = {
    methodName: paymentResponse.methodName,
    details: paymentResponse.details,
    // shippingAddress: addressToJsonString(paymentResponse.shippingAddress),
    shippingOption: paymentResponse.shippingOption,
    payerName: paymentResponse.payerName,
    payerPhone: paymentResponse.payerPhone,
    payerEmail: paymentResponse.payerEmail,
  };
  return JSON.stringify(paymentResponseDictionary, undefined, 2);
}
