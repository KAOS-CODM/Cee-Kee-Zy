export function renderFooter(): string {

return `

<footer class="bg-slate-900 text-slate-300 mt-20">

<div class="max-w-7xl mx-auto px-4 py-14">

<div class="grid md:grid-cols-4 gap-10">

<div>

<h3 class="text-white text-xl font-bold mb-4">

CEE-KEE-ZY

</h3>

<p>

Helping Nigerians discover houses, lands and cars with ease.

</p>

</div>

<div>

<h4 class="text-white font-semibold mb-4">

Properties

</h4>

<ul class="space-y-2">

<li><a href="/houses">Houses</a></li>

<li><a href="/lands">Lands</a></li>

<li><a href="/cars">Cars</a></li>

<li><a href-"/other">Other Properties></a></li>
</ul>

</div>

<div>

<h4 class="text-white font-semibold mb-4">

Company

</h4>

<ul class="space-y-2">

<li><a href="/about">About</a></li>

<li><a href="/contact">Contact</a></li>

</ul>

</div>

<div>

<h4 class="text-white font-semibold mb-4">

Search

</h4>

<a
href="/search"
class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">

Browse Listings

</a>

</div>

</div>

<div class="border-t border-slate-700 mt-10 pt-6 text-center text-sm">

&copy; ${new Date().getFullYear()} CEE-KEE-ZY. All Rights Reserved.

</div>

</div>

</footer>

`;

}