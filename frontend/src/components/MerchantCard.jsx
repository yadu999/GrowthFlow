const customers = [
  {
    name:"Aarav Sharma",
    product:"Nike Air Max",
    cart:4999,
    device:"iPhone 15",
    payment:"UPI",
    coupon:false,
    time:780
  },
  {
    name:"Priya Mehta",
    product:"Sony Headphones",
    cart:2899,
    device:"Android",
    payment:"Credit Card",
    coupon:true,
    time:420
  },
  {
    name:"Rohan Verma",
    product:"Gaming Keyboard",
    cart:3599,
    device:"Laptop",
    payment:"Net Banking",
    coupon:false,
    time:610
  }
];

function MerchantCard({ customer, onNext }) {
  return (
    <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-semibold">
            Incoming Customer
          </h2>

          <p className="text-gray-400">
            Live merchant simulation
          </p>
        </div>

        <button
          onClick={onNext}
          className="text-blue-400"
        >
          Next →
        </button>

      </div>

      <div className="mt-6 space-y-3">

        <Info label="Customer" value={customer.name} />

        <Info label="Product" value={customer.product} />

        <Info label="Cart" value={`₹${customer.cart}`} />

        <Info label="Device" value={customer.device} />

        <Info label="Payment" value={customer.payment} />

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-800 pb-2">
      <span className="text-gray-400">{label}</span>
      <span>{value}</span>
    </div>
  );
}

export { customers };
export default MerchantCard;