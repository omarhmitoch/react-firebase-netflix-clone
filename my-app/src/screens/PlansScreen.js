import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import {selectUser} from "../features/userSlice"
import './PlansScreen.css'
import db from '../firebase';
import {loadStripe} from "@stripe/stripe-js"
function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection("customers")
            .doc(user.uid)
            .collection("subscriptions")
            .get()
            .then(querySnapShot => {
                querySnapShot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds,
                    });
                    
                })
            })

    }, [user.uid])
    console.log(subscription)
    useEffect(() => {
        db.collection("products")
            .where("active", "==", true)
            .get()
            .then(querySnapShot => {
                const products = {};
                querySnapShot.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection("prices").get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceDaata: price.data()
                        }
                    })
                })
                setProducts(products);
            })
    }, [])
    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers')
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            });
        console.log(docRef)
        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                // show an error to your customer
                // inspect cloud functions logs !!!
                alert("An error occured: " + error.message);
                console.log("error");
            }
            if (sessionId) {
                // if we have a session, let's redirect to checkout
                // then init stripe
                const stripe = await loadStripe("pk_test_51JvR3HFzJIaIXJYSoAPgKH9jTscXpfIDIeigLVQPa901eECzo8vT8v5tLDn32xpPEpyNdw61k1xRqAm82AJNKehu001n2k5ggE"); // public api key
                stripe.redirectToCheckout({ sessionId });
                
            }
        })
    }
    return (
        <div className="plansScreen">
            {subscription && <p>Renewal date:
             {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}
            </p>}
            {Object.entries(products).map(([productId, productData]) => {
                    // add some logic to check if the user's subscription is active ...
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
                
                
                return (
                    <div key={productId}
                        className={`${isCurrentPackage && "plansScreen__plan--disabled"}  plansScreen__plan`}>
                        <div className="planScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage ? "Current Package" : "Subscribe"}
                        </button>
                    </div>
                )
                })}
        </div>
    )
}

export default PlansScreen
