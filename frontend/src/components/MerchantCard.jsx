import {
  Smartphone,
  CreditCard,
  ShoppingBag,
  User,
  Laptop,
  Clock,
  ArrowRight,
} from "lucide-react";

const customers = [
  {
    name: "Aarav Sharma",
    product: "Nike Air Max",
    cart: 4999,
    device: "iPhone 15",
    payment: "UPI",
    coupon: false,
    time: 780,
  },
  {
    name: "Priya Mehta",
    product: "Sony Headphones",
    cart: 2899,
    device: "Android",
    payment: "Credit Card",
    coupon: true,
    time: 420,
  },
  {
    name: "Rohan Verma",
    product: "Gaming Keyboard",
    cart: 3599,
    device: "Laptop",
    payment: "Net Banking",
    coupon: false,
    time: 610,
  },
];

function MerchantCard({ customer, onNext }) {
  return (
    <section className="py-2">
      {/* Header */}
      <div className="flex items-start justify-between pb-6 border-b border-border">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">
            Live Customer Session
          </p>

          <h2 className="text-2xl font-semibold mt-2 text-text">
            Incoming Customer
          </h2>

          <p className="text-sm text-muted mt-1">
            Real-time checkout activity
          </p>
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-border hover:bg-surface transition"
        >
          Next
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Customer Identity */}
      <div className="flex items-center gap-4 py-6 border-b border-border">
        <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white text-xl font-semibold">
          {customer.name.charAt(0)}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text">
            {customer.name}
          </h3>

          <p className="text-sm text-muted">
            {customer.product}
          </p>
        </div>
      </div>

      {/* Customer Details */}
      <div>
        <Info
          icon={ShoppingBag}
          label="Cart Value"
          value={`₹${customer.cart.toLocaleString("en-IN")}`}
          highlight
        />

        <Info
          icon={Smartphone}
          label="Device"
          value={customer.device}
        />

        <Info
          icon={CreditCard}
          label="Payment"
          value={customer.payment}
        />

        <Info
          icon={CreditCard}
          label="Coupon Used"
          value={customer.coupon ? "Yes" : "No"}
        />

        <Info
          icon={Clock}
          label="Time on Site"
          value={`${Math.floor(customer.time / 60)} min ${customer.time % 60} sec`}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div>
          <p className="text-xs text-muted uppercase tracking-wide">
            Session Status
          </p>

          <p className="text-sm font-medium text-success mt-1">
            Active Session
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted">
          <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
          Live
        </div>
      </div>
    </section>
  );
}

function Info({ icon: Icon, label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <Icon size={17} className="text-muted" />

        <span className="text-sm text-muted">
          {label}
        </span>
      </div>

      <span
        className={`text-sm font-medium ${
          highlight ? "text-text text-base" : "text-text"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export { customers };
export default MerchantCard;