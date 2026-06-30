import { publicLayout } from "../../../views/layouts/publicLayout";

export function renderAboutView(): string {
    return publicLayout({
        seo:{
            title: "About CEE-KEE-ZY Listing",
            description: "Learn more about CEE-KEE-ZY Listing.",
        },

        body: `
<section class="max-w-5xl mx-auto px-4 py-16">

    <h1 class="text-4xl font-bold mb-6">
        About CEE-KEE-ZY Listing
    </h1>

    <p class="text-lg text-gray-600 mb-6">
        CEE-KEE-ZY Listing connects buyers, renters and sellers across
        Nigeria through a modern property listing platform.
    </p>

    <div class="grid md:grid-cols-3 gap-8 mt-12">

        <div class="bg-white rounded-xl shadow p-6">
            <h2 class="font-bold text-xl mb-3">Houses</h2>
            <p>Browse quality residential and commercial properties.</p>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
            <h2 class="font-bold text-xl mb-3">Land</h2>
            <p>Discover plots suitable for homes, businesses and investment.</p>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
            <h2 class="font-bold text-xl mb-3">Cars</h2>
            <p>Explore verified vehicle listings from trusted sellers.</p>
        </div>

    </div>

</section>
`
    });
}