import {
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GiftIcon } from "@heroicons/react/16/solid";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OYfoaIq3UtTXBLBfaXNVnNlivAo1XhIXixfW8HBzwNbfQJQ4ZikNGbVy5sEvCBM5cC7EmP2WuVyYzd5po8basC000RtMMs8tx"
);

export default function CheckoutForm() {
  const elements = useElements();
  const stripejs = useStripe();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error: any) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event: any) => {
    // event.preventDefault();
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: 4230,
    //   currency: "nzd",
    // });
    // const clientSecret: string = paymentIntent.client_secret as string;
    // const { error } = await stripejs?.confirmPayment({
    //   elements: elements!,
    //   clientSecret,
    //   confirmParams: {
    //     return_url: "localhost:3000/",
    //   },
    // });
    // if (error) {
    //   // This point is only reached if there's an immediate error when
    //   // confirming the payment. Show the error to your customer (for example, payment details incomplete)
    //   handleError(error);
    // } else {
    //   // Your customer is redirected to your `return_url`. For some payment
    //   // methods like iDEAL, your customer is redirected to an intermediate
    //   // site first to authorize the payment, then redirected to the `return_url`.
    // }
  };

  const options = {
    layout: {
      type: "accordion" as const,
      defaultCollapsed: true,
      radios: false,
      spacedAccordionItems: true,
    },
  };

  const [showGiftCard, setShowGiftCard] = useState(false);
  return (
    <form onSubmit={handleSubmit}>
      <ExpressCheckoutElement onConfirm={handleSubmit} />

      <PaymentElement options={options} className="mt-4" />

      <Card className="w-full mt-2 rounded-none text-gray-500">
        <CardHeader onClick={() => setShowGiftCard(!showGiftCard)}>
          <div className="flex items-center space-x-3">
            <GiftIcon className="max-h-5 -ml-3" />
            <div className="space-y-1">
              <CardTitle className="text-sm text-gray-500 ml-3">
                Gift Card
              </CardTitle>
              {/* <CardDescription>
                Pay with your Rialto/Event Cinemas gift card
              </CardDescription> */}
            </div>
          </div>
        </CardHeader>
        {showGiftCard && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="Enter card number" />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-2 flex-1">
                <Label htmlFor="pin">PIN</Label>
                <Input id="pin" type="password" placeholder="Enter PIN" />
              </div>
              <Button className="self-center mt-8">Redeem</Button>
            </div>
          </CardContent>
        )}
      </Card>

      <Button
        className="mt-6 w-full"
        type="submit"
        disabled={!stripe || loading}
      >
        Complete your order
      </Button>
    </form>
  );
}
