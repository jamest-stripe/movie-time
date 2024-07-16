"use client";
import CheckoutForm from "@/components/stripe/checkout-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function Home() {
  const options: StripeElementsOptions = {
    mode: "payment" as const,
    amount: 4230,
    currency: "nzd",
    externalPaymentMethodTypes: ["external_paypal"],

    // Fully customizable with appearance API.
    appearance: {
      theme: "stripe",
      variables: {
        borderRadius: "0",
      },
    },
  };

  return (
    <div className="mx-auto  px-4 sm:px-6 lg:px-8 mt-6 bg-gray-50">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto max-w-xl bg-white px-5 ">
        <Card className="max-w-full shadow-md rounded-none">
          <CardHeader className="font-bold text-lg text-center">
            Booking Summary
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span>2x Adult</span>
              <span className="font-bold">$39.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>2x Booking Fees</span>
              <span className="font-bold">$3.30</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <span className="font-bold text-lg">Total price</span>
              <span className="font-bold text-lg">$42.30</span>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <Card className="bg-gray-100 rounded-none">
            <CardHeader className="font-bold">Your Details</CardHeader>
            <CardDescription></CardDescription>
            <CardContent>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-12 border border-gray-300 rounded-none px-3"
                required={true}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full h-12 border border-gray-300 rounded-none px-3 mt-3"
                required={true}
              />
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 px-6">
          <h2 className="font-bold">Terms and Conditions</h2>

          <div className="py-4 flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-light"
            >
              I have read and agree to the Terms & Conditions and the Rialto
              Cinemas Privacy Policy
            </label>
          </div>
        </div>
        {/* Payment method list */}
        <div className="my-6 px-6">
          <h2 className="font-bold mb-4">Payment Method</h2>
          <Elements stripe={stripe} options={options}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
}
