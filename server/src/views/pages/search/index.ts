import { publicLayout } from "@/views/layouts/publicLayout";
import { renderPropertyCard } from "@/views/partials/propertyCard";
import type { Listing } from "@/models/Listing";

interface SearchViewData {
    results: Listing[];
    q: string;
    category?: string;
}

export function renderSearchView(data: SearchViewData) {

    return publicLayout({

        seo:{
            title: data.q
                ? `Search: ${data.q}`
                : "Search Properties",
            
            description: "Search houses, lands and cars.",
        },

        body: `

<section class="bg-blue-700 text-white">

<div class="max-w-7xl mx-auto px-4 py-16">

<h1 class="text-5xl font-bold mb-4">

Find Properties

</h1>

<p class="text-blue-100 text-lg mb-8">

Search houses, lands, cars and other properties.

</p>

<form
action="/search"
method="GET"
class="bg-white rounded-xl shadow-lg p-6 grid md:grid-cols-4 gap-4">

<input
type="text"
name="q"
value="${data.q}"
placeholder="Search by title, location..."
class="border rounded-lg px-4 py-3 text-black md:col-span-2"
/>

<select
name="category"
class="border rounded-lg px-4 py-3 text-black">

<option value="">All Categories</option>

<option value="House"
${data.category==="House"?"selected":""}>
Houses
</option>

<option value="Land"
${data.category==="Land"?"selected":""}>
Lands
</option>

<option value="Car"
${data.category==="Car"?"selected":""}>
Cars
</option>

<option value="Other"
${data.category==="Other"?"selected":""}>
Other
</option>

</select>

<button
class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">

Search

</button>

</form>

</div>

</section>

<section class="max-w-7xl mx-auto px-4 py-12">

<div class="flex justify-between items-center mb-8">

<div>

<h2 class="text-3xl font-bold">

Search Results

</h2>

<p class="text-gray-500">

${data.results.length}
propert${data.results.length!==1?"ies": "y"} found

</p>

</div>

<a
href="/"
class="text-blue-600 hover:underline">

← Back Home

</a>

</div>

${
data.results.length

?

`

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

${data.results.map(renderPropertyCard).join("")}

</div>

`

:

`

<div class="bg-white rounded-xl shadow p-16 text-center">

<div class="text-6xl mb-6">

<i class="fas fa-home w-5"></i>

</div>

<h3 class="text-3xl font-bold mb-4">

No Properties Found

</h3>

<p class="text-gray-500 mb-8">

Try changing your search keywords or category.

</p>

<a
href="/search"
class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">

Clear Search

</a>

</div>

`

}

</section>

`

    });

}