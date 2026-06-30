import type { Listing } from "@/models/Listing";

export function renderPropertyCard(listing: Listing): string {

const image=
listing.images.length
?listing.images[0]
:"/static/images/no-image.jpg";

return`

<article class="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-2xl transition duration-300">

<div class="relative overflow-hidden">

<a href="/listing/${listing.slug}">

<img
src="${image}"
alt="${listing.title}"
class="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
/>

</a>

<div class="absolute top-4 left-4 flex gap-2">

<span class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs uppercase">

${listing.category}

</span>

${
listing.featured
?`<span class="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
Featured
</span>`
:""
}

</div>

</div>

<div class="p-6">

<h2 class="text-2xl font-bold mb-2 line-clamp-2">

<a href="/listing/${listing.slug}">

${listing.title}

</a>

</h2>

<p class="text-gray-500 mb-4">

<i class="fas fa-map-marked w-5"></i> ${listing.location}

</p>

<div class="flex justify-between items-center">

<p class="text-3xl font-bold text-green-700">

₦${listing.price.toLocaleString()}

</p>

<a
href="/listing/${listing.slug}"
class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">

View

</a>

</div>

</div>

</article>

`;

}