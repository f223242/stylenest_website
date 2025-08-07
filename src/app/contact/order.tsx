'use client';

export default function OrderPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Place an Order</h1>

      <form
        action="https://formbold.com/s/oY5Ob"
        method="POST"
        className="space-y-4 bg-white shadow p-6 rounded-xl"
      >
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Order Details</label>
          <textarea
            name="order"
            required
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
