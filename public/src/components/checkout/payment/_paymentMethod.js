// Import basics
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import dispatch actions
import { savePaymentMethod } from "../../../actions/cartActions.js";
// Import components
import Radio from "../../inputs/radio.js";
import Button from "../../inputs/button.js";
import Steps from "../steps.js";
import Header from "../../multipurpose/header.js";

const PaymentMethod = ({ history }) => {
  // Get states
  const { userInfo } = useSelector((state) => state.userLogin);
  const { items, shippingAddress, savedPaymentMethod } = useSelector(
    (state) => state.cart
  );
  // Set form variables
  const [paymentMethod, setPaymentMethod] = useState(
    savedPaymentMethod || "paypal"
  );

  // TODO: Validate user token
  // Kick the user to login if not logged in
  useEffect(() => {
    if (!userInfo) history.push("/login?redirect=payment");
  }, [userInfo]);
  // Kick the user to the products page if their cart is empty
  useEffect(() => {
    if (items.length === 0) history.push("/merch");
  }, [items]);
  // Kick the user to the shipping screen if there was no address
  useEffect(() => {
    if (!shippingAddress) history.push("/shipping");
  }, [shippingAddress]);

  // Set the payment method and save it on option click
  const onPaymentSelect = (e) => {
    setPaymentMethod(e.target.value);
    dispatch(savePaymentMethod(e.target.value));
  };

  // Submit the payment method and go to the payment details screen
  const dispatch = useDispatch();
  const onMethodSubmit = () => {
    dispatch(savePaymentMethod(paymentMethod));
    paymentMethod && history.push("/payment");
  };

  return (
    <div className="flex flex-col items-center w-full h-full px-4 mb-6">
      <Steps
        step1={true}
        step2={true}
        step3={"method"}
        step4={savedPaymentMethod !== ""}
      />
      <div className="flex flex-col mt-7">
        <Header text="Payment Method" />
        <div className="bg-gray-700 flex flex-col py-4 px-8">
          <Radio
            name="paymentMethod"
            value={paymentMethod}
            label="Choose One"
            onChange={onPaymentSelect}
            options={[
              { label: "Credit Card", label2: "or PayPal", value: "paypal" },
              { label: "Bitcoin", value: "bitcoin" },
            ]}
          />
        </div>
        <Button text="Review Order" onClick={onMethodSubmit} />
      </div>
    </div>
  );
};

export default PaymentMethod;
