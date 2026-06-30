import type { ListingData } from "../../../views/types/listing";

export function renderListingRow(listing: ListingData): string {
    const image =
        listing.images.length > 0
            ? listing.images[0]
            : "/static/images/no-image.jpg";

    return `
<tr class="border-b">

<td class="p-4">
    <img
        src="${image}"
        class="w-24 h-16 rounded object-cover"
    />
</td>

<td class="p-4 font-medium">
    ${listing.title}
</td>

<td class="p-4 capitalize">
    ${listing.category}
</td>

<td class="p-4">
    ₦${listing.price.toLocaleString()}
</td>

<td class="p-4">

<span class="${
listing.status === "Published"
? "bg-green-100 text-green-700"
: "bg-yellow-100 text-yellow-700"
} px-3 py-1 rounded-full text-sm">

${listing.status}

</span>

</td>

<td class="p-4">
${
listing.featured
? `<span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
Featured
</span>`
: ""
}
</td>

<td class="p-4">

<div class="flex gap-3">

<a
href="/admin/listings/edit/${listing._id}"
class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">

Edit

</a>

<form
action="/admin/listings/delete/${listing._id}"
method="POST"
onsubmit="return confirm('Delete this listing?')">

<button
class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">

Delete

</button>

</form>

</div>

</td>

</tr>
`;
}


