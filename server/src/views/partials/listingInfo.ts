import type { Listing } from "@/models/Listing";

export function renderListingInfo(listing: Listing): string {

return`

<section class="max-w-7xl mx-auto px-4 py-10">

<div class="grid lg:grid-cols-3 gap-8">

<div class="lg:col-span-2 bg-white rounded-2xl shadow p-8">

<div class="flex flex-wrap gap-3 mb-5">

<span class="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

${listing.category}

</span>

${
listing.featured
?`

<span class="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">

⭐ Featured

</span>

`
:""
}

</div>

<h1 class="text-4xl font-bold mb-6">

${listing.title}

</h1>

<p class="text-5xl font-bold text-green-700 mb-6">

₦${listing.price.toLocaleString()}

</p>

<div class="space-y-4 text-lg">

<div>

<i class="fas fa-map-marked w-5"></i>

<span class="font-medium">

${listing.location}

</span>

</div>

<div>

<i class="fas fa-home w-5"></i> Category:

<strong>

${listing.category}

</strong>

</div>

<div>

<i class="fas fa-calendar-check w-5"></i> Status:

<strong>

${listing.status}

</strong>

</div>

</div>

</div>

<div>

<div class="sticky top-28 bg-white rounded-2xl shadow p-8">

<h2 class="text-2xl font-bold mb-6">

Interested?

</h2>

<a

href="https://wa.me/2348000000000?text=Hello,%20I'm%20interested%20in%20${encodeURIComponent(listing.title)}"

target="_blank"

class="block w-full text-center bg-emerald-400 hover:bg-emerald-500 text-black rounded-xl py-4 mb-4">

<i class="fas fa-whatsapp-square w-5"></i>WhatsApp Enquiry

</a>

<a

href="tel:+2348000000000"

class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 mb-4">

<i class="fas fa-phone w-5"></i>Call Now

</a>

<button

onclick="navigator.share?navigator.share({title:'${listing.title}',url:window.location.href}):navigator.clipboard.writeText(window.location.href)"

class="w-full border rounded-xl py-4 hover:bg-gray-100">

<i class="fas fa-share w-5"></i>Share Listing

</button>

</div>

</div>

</div>

</section>

`;

}