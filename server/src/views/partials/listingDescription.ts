import type { Listing } from "@/models/Listing";

export function renderListingDescription(listing: Listing): string {

return`

<section class="max-w-7xl mx-auto px-4 pb-10">

<div class="bg-white rounded-2xl shadow p-10">

<h2 class="text-3xl font-bold mb-8">

Property Description

</h2>

<div class="prose prose-lg max-w-none leading-9 text-gray-700 whitespace-pre-line">

${listing.description}

</div>

<hr class="my-10">

<div class="grid md:grid-cols-3 gap-6">

<div class="bg-slate-50 rounded-xl p-6">

<div class="text-3xl mb-3">

<i class="fas fa-money-bill"></i>

</div>

<h3 class="font-bold mb-2">

Affordable Pricing

</h3>

<p class="text-gray-500">

Competitive market pricing.

</p>

</div>

<div class="bg-slate-50 rounded-xl p-6">

<div class="text-3xl mb-3">

<i class="fas fa-map-marked w-5"></i>

</div>

<h3 class="font-bold mb-2">

Prime Location

</h3>

<p class="text-gray-500">

Located in a desirable area.

</p>

</div>

<div class="bg-slate-50 rounded-xl p-6">

<div class="text-3xl mb-3">

<i class="fas fa-check"></i>

</div>

<h3 class="font-bold mb-2">

Verified Listing

</h3>

<p class="text-gray-500">

Posted by CEE-KEE-ZY.

</p>

</div>

</div>

</div>

</section>

`;

}