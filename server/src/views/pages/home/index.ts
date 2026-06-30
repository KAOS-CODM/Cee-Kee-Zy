import { publicLayout } from "@/views/layouts/publicLayout";
import { renderPropertyGrid } from "@/views/partials/propertyGrid";
import type { HomeViewData } from "@/views/types/home";

export function renderHomeView(data: HomeViewData){

return publicLayout({

seo: {
    title:"CEE-KEE-ZY",
    
    description:"Find Houses, Lands and Cars Across Nigeria.",
},

body:`

<section class="relative bg-linear-to-r from-blue-800 to-blue-600 text-white">

<div class="absolute inset-0 bg-black/20"></div>

<div class="relative max-w-7xl mx-auto px-4 py-28">

<h1 class="text-6xl font-bold max-w-3xl leading-tight">

Find Your Dream Property Today

</h1>

<p class="text-blue-100 text-xl mt-6 max-w-2xl">

Browse verified houses, lands, cars and investment opportunities across Nigeria.

</p>

<form

action="/search"

method="GET"

class="bg-white rounded-2xl mt-12 p-6 grid md:grid-cols-4 gap-4 shadow-2xl">

<input

name="q"

placeholder="Search properties..."

class="border rounded-lg px-4 py-4 text-black md:col-span-2"

/>

<select

name="category"

class="border rounded-lg px-4 py-4 text-black" aria-label="category-selection">

<option value="">

All Categories

</option>

<option value="House">

House

</option>

<option value="Land">

Land

</option>

<option value="Car">

Car

</option>

<option value="Other">

Other

</option>

</select>

<button

class="bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold">

Search

</button>

</form>

<div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">

<div>

<div class="text-4xl font-bold">

${data.featured.length}

</div>

<div class="text-blue-100">

Featured

</div>

</div>

<div>

<div class="text-4xl font-bold">

${data.recent.length}

</div>

<div class="text-blue-100">

Recent

</div>

</div>

<div>

<div class="text-4xl font-bold">

4

</div>

<div class="text-blue-100">

Categories

</div>

</div>

<div>

<div class="text-4xl font-bold">

100%

</div>

<div class="text-blue-100">

Verified

</div>

</div>

</div>

</div>

</section>

<section class="max-w-7xl mx-auto px-4 py-20">

<div class="grid md:grid-cols-4 gap-6">

<a href="/houses" class="bg-white rounded-xl shadow hover:shadow-xl p-8 text-center">

<i class="fas fa-home w-5"></i>

<h3 class="font-bold text-xl mt-4">

Houses

</h3>

</a>

<a href="/lands" class="bg-white rounded-xl shadow hover:shadow-xl p-8 text-center">

<i class="fas fa-globe w-5"></i>

<h3 class="font-bold text-xl mt-4">

Lands

</h3>

</a>

<a href="/cars" class="bg-white rounded-xl shadow hover:shadow-xl p-8 text-center">

<i class="fas fa-car w-5"></i>

<h3 class="font-bold text-xl mt-4">

Cars

</h3>

</a>

<a href="/other" class="bg-white rounded-xl shadow hover:shadow-xl p-8 text-center">

<i class="fas fa-box w-5"></i>

<h3 class="font-bold text-xl mt-4">

Other

</h3>

</a>

</div>

</section>

${renderPropertyGrid({

title:"Featured Properties",

listings:data.featured

})}

${renderPropertyGrid({

title:"Recent Listings",

listings:data.recent

})}

<section class="bg-blue-700 text-white py-20 mt-20">

<div class="max-w-5xl mx-auto text-center px-4">

<h2 class="text-5xl font-bold mb-6">

Looking for Something Special?

</h2>

<p class="text-blue-100 text-xl mb-10">

Browse hundreds of verified listings across Nigeria.

</p>

<a

href="/search"

class="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100">

Browse Properties

</a>

</div>

</section>

`

});

}