'use client';

export default function OrderForm() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Place Your Order</h1>
      <form
        action="https://formbold.com/s/6rXnb"
        method="POST"
        className="space-y-4"
      >
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Order Details</label>
          <textarea
            name="order_details"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
