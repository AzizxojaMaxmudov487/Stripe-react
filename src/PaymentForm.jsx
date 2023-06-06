import React, { useState } from "react";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CARD_STYLE = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe Ui, sans-serif',
            fontSize: '20px',
            fontSmoothing: 'antialised',
            ':-webkit-autofill': { color: '#000' },
            '::placeholder': { color: '#fff' }
        },
        invalid: {
            iconColor: '#ffc7eee',
            color: 'ffc7eee'
        }
    }
}

export default function PaymentForm() {

    const [success, setSuccess] = useState(false);
    const [pay, setPay] = useState(false)
    const stripe = useStripe();
    const elements = useElements();

    const submitPurchase = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 200000, // USD = 200$
                    id
                })
                if (response.data.success) {
                    console.log("Successful payment")
                }
            } catch (error) {
                setSuccess(true);
                console.error("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    const changeSuccess = () => {
        setSuccess(false)
        setPay(true)
    }

    return (
        <>
            {!success ?
                <form onSubmit={submitPurchase}>
                    <div className="form-group">
                        <div className="form-row">
                            <CardElement options={CARD_STYLE} />
                        </div>
                    </div>
                    <button className="payButton" onClick={() => changeSuccess}>Pay 💰</button>

                </form>
                :
                <h2 className="success">Congratulations 👍</h2>
            }

           
        </>
    )
}