import type { Listing } from "../../models/Listing";

export function renderListingGallery(listing: Listing): string {

const images=
listing.images.length
?listing.images
:["/static/images/no-image.jpg"];

return`

<section class="max-w-7xl mx-auto px-4 pt-10">

<div class="bg-white rounded-2xl shadow overflow-hidden">

<img
id="mainImage"
src="${images[0]}"
alt="${listing.title}"
class="w-full h-130 object-cover transition"
/>

${
images.length>1
?`

<div class="grid grid-cols-4 md:grid-cols-6 gap-3 p-4">

${images.map(image=>`

<img
src="${image}"
onclick="document.getElementById('mainImage').src='${image}'"
class="cursor-pointer rounded-lg h-24 object-cover hover:opacity-80 border"
/>

`).join("")}

</div>

`
:""
}

</div>

</section>

`;

}