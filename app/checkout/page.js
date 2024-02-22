import dynamic from "next/dynamic";
import Script from 'next/script';
const Checkoutmain = dynamic(()=>import('../../components/Checkoutcomp/Checkoutmain'))
const CheckoutPage = () => {
  return (
    <>
      <Script defer src="https://checkout.razorpay.com/v1/checkout.js" />
      <Checkoutmain />
    </>
  )
}
export default CheckoutPage