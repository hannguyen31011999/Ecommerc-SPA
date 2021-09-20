import React from 'react'

export default function PaymentComponent() {
    return (
        <>
            <div className="checkout__payment">
                <div className="checkout__payment--title">Payment Info</div>
                <div className="checkout__payment--content">
                    <h4 className="payment__title">Select Payment Option</h4>
                    <div className="payment__item active">
                        <img src="./assets/img/payment-method.png" alt="*" />
                        <h5 className="payment__category">Direct Payment</h5>
                    </div>
                    <div className="payment__item">
                        <img src="./assets/img/paypal.png" alt="*" />
                        <h5 className="payment__category">Payment with PayPal</h5>
                    </div>
                    <div className="payment__item">
                        <img src="./assets/img/logo VNPAY-02.png" alt="*" />
                        <h5 className="payment__category">Payment with VNPay</h5>
                    </div>
                </div>
            </div>
        </>
    )
}
