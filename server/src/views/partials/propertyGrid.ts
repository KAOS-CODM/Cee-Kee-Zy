import type { Listing } from "../../models/Listing";
import { renderPropertyCard } from "./propertyCard";

interface PropertyGridOptions{

title:string;

listings:Listing[];

}

export function renderPropertyGrid({

title,

listings

}:PropertyGridOptions){

return`

<section class="max-w-7xl mx-auto px-4 py-16">

<div class="flex justify-between items-center mb-10">

<div>

<h2 class="text-4xl font-bold">

${title}

</h2>

<p class="text-gray-500 mt-2">

Discover our latest verified listings.

</p>

</div>

<a

href="/search"

class="hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">

View All

</a>

</div>

${
listings.length

?

`

<div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

${listings.map(renderPropertyCard).join("")}

</div>

`

:

`

<div class="bg-white rounded-2xl shadow text-center p-16">

<div class="text-6xl mb-6">

<i class="fas fa-home w-5"></i>

</div>

<h3 class="text-2xl font-bold mb-3">

No Listings Available

</h3>

<p class="text-gray-500">

Please check back later.

</p>

</div>

`

}

</section>

`;

}