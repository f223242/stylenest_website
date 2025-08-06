export default function OrderPage() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Place Your Order</h2>
      <form
        action="https://formbold.com/s/oY5Ob"
        method="POST"
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
        <textarea
          name="message"
          placeholder="Order Details (Product, Size, etc.)"
          required
          className="w-full border border-gray-300 p-2 rounded"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
