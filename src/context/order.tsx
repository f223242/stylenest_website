export default function OrderPage() {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Place Your Order</h1>
      <p className="text-center text-lg text-muted-foreground mb-8">
        Fill out the form below to place your order. We will contact you shortly to confirm the details.
      </p>

      <form
        action="https://formspree.io/f/mwpqrgay"
        method="POST"
        className="space-y-4 bg-card p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="border p-2 w-full rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="border p-2 w-full rounded"
        />

        <textarea
          name="order"
          placeholder="Enter product name, quantity, size, etc."
          required
          className="border p-2 w-full rounded"
          rows={4}
        ></textarea>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
