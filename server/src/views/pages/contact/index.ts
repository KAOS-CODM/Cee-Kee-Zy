import { publicLayout } from "../../../views/layouts/publicLayout";

export function renderContactView(): string {
    return publicLayout({
       seo:{
        title: "Contact Us",
        description: "Get in touch with CEE-KEE-ZY Listing.",
       },

        body: `
<section class="max-w-4xl mx-auto px-4 py-16">

    <h1 class="text-4xl font-bold mb-6">
        Contact Us
    </h1>

    <p class="text-gray-600 mb-8">
        Have questions about a listing or our platform? We'd love to hear from you.
    </p>

    <div class="bg-white rounded-xl shadow p-8">

        <form class="space-y-6">

            <input
                class="w-full border rounded-lg p-3"
                placeholder="Your Name">

            <input
                class="w-full border rounded-lg p-3"
                placeholder="Email Address">

            <textarea
                rows="6"
                class="w-full border rounded-lg p-3"
                placeholder="Message"></textarea>

            <button
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">

                Send Message

            </button>

        </form>

    </div>

</section>
`
    });
}