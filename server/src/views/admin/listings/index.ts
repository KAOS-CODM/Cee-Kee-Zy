import { renderAdminLayout } from "../../../views/admin/layout";
import type { ListingData } from "../../../views/types/listing";
import { renderListingRow } from "../../../views/admin/listings/listingRow";

interface ListingsPageData {
    listings: ListingData[];
}

function badge(status: string) {
    if (status === "Published") {
        return `
            <span class="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
                Published
            </span>
        `;
    }

    return `
        <span class="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">
            Draft
        </span>
    `;
}

export function renderListingsPage({
    listings,
}: ListingsPageData): string {

    return renderAdminLayout({

        title: "Manage Listings",

        currentPage: "listings",

        content: `

<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

    <div class="flex gap-3">

        <input
            id="search"
            type="text"
            placeholder="Search..."
            class="border rounded-lg px-4 py-2 w-72"
        >

        <select
            id="category"
            class="border rounded-lg px-4">

            <option value="">All Categories</option>
            <option value="house">Houses</option>
            <option value="land">Lands</option>
            <option value="car">Cars</option>
            <option value="other">Other</option>

        </select>

    </div>

    <a
        href="/admin/listings/create"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">

        + New Listing

    </a>

</div>

<div class="bg-white rounded-xl shadow overflow-hidden">

<table class="min-w-full">

<thead class="bg-slate-100">

<tr>

<th class="px-5 py-3 text-left">Image</th>

<th class="px-5 py-3 text-left">Title</th>

<th class="px-5 py-3 text-left">Category</th>

<th class="px-5 py-3 text-left">Price</th>

<th class="px-5 py-3 text-left">Status</th>

<th class="px-5 py-3 text-right">Actions</th>

</tr>

</thead>

<tbody>

${listings.map(listing => `

<tr class="border-t">

<td class="p-4">

<img
src="${listing.images[0] || "/static/images/no-image.jpg"}"
class="w-20 h-14 object-cover rounded"
/>

</td>

<td class="p-4">

<div class="font-semibold">

${listing.title}

</div>

<div class="text-xs text-gray-500">

${listing.slug}

</div>

</td>

<td class="p-4 capitalize">

${listing.category}

</td>

<td class="p-4 font-semibold">

₦${listing.price.toLocaleString()}

</td>

<td class="p-4">

${badge(listing.status)}

${listing.featured
? `<span class="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
Featured
</span>`
: ""}

</td>

<td class="p-4 text-right space-x-2">

<a
href="/admin/listings/edit/${listing._id}"
class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded">

Edit

</a>

<button
data-id="${listing._id}"
class="delete-btn bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded">

Delete

</button>

</td>

</tr>

`).join("")}

</tbody>

</table>

</div>

<script>

document.querySelectorAll(".delete-btn").forEach(btn=>{

btn.onclick=async()=>{

if(!confirm("Delete this listing?")) return;

const id=btn.dataset.id;

await fetch("/api/listings/"+id,{
method:"DELETE"
});

location.reload();

}

});

</script>

`
    });

}