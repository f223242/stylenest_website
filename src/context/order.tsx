<form
  action="https://formbold.com/s/oY5Ob"
  method="POST"
  className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
>
  <h2 className="text-2xl font-bold mb-4 text-center">Place Your Order</h2>

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
    placeholder="Order Details (Product Name, Size, etc.)"
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
