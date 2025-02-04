'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useUserStore } from '@/hooks/useUserStore';
import Script from 'next/script';

const Checkout = () => {

    // const {planId,paymentGateway, setStoreState} = useUserStore((store) => ({
    //     planId : store.planId,
    //     paymentGateway :store.paymentGateway,
    //     setStoreState: store.setStoreState
    // }));
    const setStoreState = useUserStore((state) => state.setStoreState);
    const paymentGateway = useUserStore((state)=> state.paymentGateway)
    const planId = useUserStore(state => state.planId)
    const name = useUserStore(state => state.name)
    const email = useUserStore(state => state.email)
    const router= useRouter()

  async function createRazorpayPayment() {
    const subscriptionCreated = await fetch(
      `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/razorpay/create-subscription`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure JSON format
        },
        body: JSON.stringify({
          planId: planId,
          name : name,
          email : email
        }),
      }
    );

    const subscriptionData = await subscriptionCreated.json();
    const subscriptionInfo = subscriptionData.subscription;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY_ID as string,
      subscription_id: subscriptionInfo.id,
      name: 'Alchemyst AI',
      description: 'this is some description',
      handler: async function (response: any) {
        console.log(response, 'this is the subs response');
        if (response) {
          router.push('/payment/success');
        }
      },
      notes: {
        subscription_id: subscriptionInfo.id,
      },
      modal: {
        escape: false,
        ondismiss: async function () {
          await fetch(
            `${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/razorpay/cancel-subscription`,
            {
              method: "POST",
              body: JSON.stringify({ subscriptionId: subscriptionInfo.id }),
              headers: { "Content-Type": "application/json" },
            }
          );
        },
      },
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
  }

  async function createSubscription() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_BACKEND_URL}/api/paypal/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data, 'paypal sub data');

      const subscriptionId = data.data.id;
      return subscriptionId;
    } catch (error) {
      console.log(error);
    }
  }

  async function onApprove(data: any) {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePayment = async() => {
    console.log(paymentGateway)
    if(paymentGateway === 'razorpay') {
      createRazorpayPayment()
    }
  }
    
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-inherit'>
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
        <div className='w-[50%] flex flex-col items-center justify-start'>
            <div>
                <p>AlchemystAI</p>
            </div>
            <div>
                <p>
                    Alchemyst platform account will be created based on the information given below
                </p>
            </div>
            <form className="w-full max-w-md bg-inherit p-6 rounded-2xl shadow-md space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-200 pb-2">Name</label>
                <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 text-black"
                    placeholder="Enter your name"
                    onChange={(e) => {
                      setStoreState({
                        name : e.target.value
                      })
                    }}
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-200 pb-2">Email</label>
                <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 text-black"
                    placeholder="Enter your email"
                    onChange={(e) => {
                      setStoreState({
                        email : e.target.value
                      })
                    }}
                />
                </div>
            </form>
            
            <div className="w-full max-w-md bg-inherit p-6 rounded-2xl shadow-md mt-4">
                <p className="text-lg font-semibold text-gray-200">Payment</p>
                <div className="mt-3 space-y-2">
                <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-yellow-600">
                    <input type="radio" name="payment" className="form-radio text-yellow-600"
                checked={paymentGateway === "paypal"}
    onChange={() => {
            setStoreState({ paymentGateway: "paypal" });
    }}
                    />
                    <span className="text-gray-200">Pay via PayPal</span>
                </label>
                <label className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-yellow-600">
                    <input type="radio" name="payment" className="form-radio text-yellow-600" 
                    checked={paymentGateway === "razorpay"}
                    onChange={() => {
                            setStoreState({ paymentGateway: "razoray" });
                    }}
                    />
                    <span className="text-gray-200">Pay via Razorpay</span>
                </label>
                </div>
            </div>
            <button className=' w-full max-w-md flex justify-center items-center'>
                <button className='border-[1px] border-gray-600 p-2 rounded-md w-[90%]' onClick={handlePayment}>
                    Pay
                </button>
            </button>
            <div>
                <PayPalScriptProvider
                options={{
                    clientId: process.env
                    .NEXT_PUBLIC_SANDBOX_PAYPAL_CLIENT_ID as string,
                    currency: 'USD',
                    intent: 'capture',
                    vault: true,
                }}
                >
                <PayPalButtons
                    style={{
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'rect',
                    label: 'pay',
                    height: 50,
                    }}
                    createSubscription={createSubscription}
                    onApprove={onApprove}
                />
                </PayPalScriptProvider>
            </div>
        </div>
        <div className='w-[50%]'></div>
    </div>
  )
}

export default Checkout