export function renderNavbar(): string {
    return `

<header class="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">

<div class="max-w-7xl mx-auto">

<div class="flex items-center justify-between px-4 py-4">

<a
href="/"
class="text-2xl font-bold text-blue-700">

CEE-KEE-ZY

</a>

<nav class="hidden lg:flex items-center gap-8 font-medium">

<a href="/" class="hover:text-blue-600 transition">
Home
</a>

<a href="/houses" class="hover:text-blue-600 transition">
Houses
</a>

<a href="/lands" class="hover:text-blue-600 transition">
Lands
</a>

<a href="/cars" class="hover:text-blue-600 transition">
Cars
</a>

<a href="/other" class="hover:text-blue-600 transition">
Other Properties
</a>

<a href="/about" class="hover:text-blue-600 transition">
About
</a>

<a href="/contact" class="hover:text-blue-600 transition">
Contact
</a>

</nav>

<div class="flex items-center gap-3">

<a
href="/search"
class="hidden lg:flex px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">

Search

</a>

<button
id="menuButton" aria-label="hamburger-menu"
class="lg:hidden p-2 rounded-lg border">

<svg
xmlns="http://www.w3.org/2000/svg"
class="w-6 h-6"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor">

<path
stroke-linecap="round"
stroke-linejoin="round"
stroke-width="2"
d="M4 6h16M4 12h16M4 18h16"/>

</svg>

</button>

</div>

</div>

<div
id="mobileMenu"
class="hidden border-t bg-white">

<nav class="flex flex-col">

<a href="/" class="px-5 py-4 hover:bg-slate-100">
Home
</a>

<a href="/houses" class="px-5 py-4 hover:bg-slate-100">
Houses
</a>

<a href="/lands" class="px-5 py-4 hover:bg-slate-100">
Lands
</a>

<a href="/cars" class="px-5 py-4 hover:bg-slate-100">
Cars
</a>

<a href="/other" class="px-5 py-4 hover:bg-slate-100">
Other Properties
</a>

<a href="/about" class="px-5 py-4 hover:bg-slate-100">
About
</a>

<a href="/contact" class="px-5 py-4 hover:bg-slate-100">
Contact
</a>

<a
href="/search"
class="px-5 py-4 bg-blue-600 text-white">

Search

</a>

</nav>

</div>

</div>

</header>

`;
}