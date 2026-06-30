import type { ListingData } from "@/views/types/listing";

interface ListingFormOptions {
    action: string;
    submitText: string;
    listing?: Partial<ListingData>;
}

export function renderListingForm({
    action,
    submitText,
    listing = {},
}: ListingFormOptions): string {

    return `

<form
    action="${action}"
    method="POST"
    enctype="multipart/form-data"
    class="space-y-6 bg-white rounded-xl shadow p-8">

<div>

<label class="block mb-2 font-medium">

Title

</label>

<input
autofocus
name="title"
required
value="${listing.title ?? ""}"
class="w-full border rounded-lg px-4 py-3"
placeholder="Luxury Duplex In Abuja"
/>

</div>

<div class="grid md:grid-cols-2 gap-6">

<div>

<label class="block mb-2 font-medium">

Category

</label>

<select
name="category"
class="w-full border rounded-lg px-4 py-3">

${["House","Land","Car","Other"]
.map(c=>`
<option
value="${c}"
${listing.category===c?"selected":""}>
${c}
</option>
`).join("")}

</select>

</div>

<div>

<label class="block mb-2 font-medium">

Price

</label>

<input
type="number"
min="0"
step="1000"
name="price"
required
value="${listing.price ?? ""}"
class="w-full border rounded-lg px-4 py-3"
/>

</div>

</div>

<div>

<label class="block mb-2 font-medium">

Location

</label>

<input
name="location"
required
value="${listing.location ?? ""}"
class="w-full border rounded-lg px-4 py-3"
placeholder="Maitama, Abuja"
/>

</div>

<div>

<label class="block mb-2 font-medium">

Description

</label>

<textarea
name="description"
rows="7"
class="w-full border rounded-lg px-4 py-3"
placeholder="Describe the property....">${listing.description ?? ""}</textarea>

</div>

<div>

<div>

<label class="block mb-2 font-medium">
Images
</label>

${
listing.images?.length
? `
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
${listing.images.map(image=>`
<img
src="${image}"
class="rounded-lg border h-28 w-full object-cover"
/>
`).join("")}
</div>
`
: ""
}

<input
type="file"
multiple
accept="image/*"
name="images"
/>

<p class="text-sm text-gray-500 mt-2">
Leave empty to keep existing images.
</p>

</div>

<select
name="status"
class="w-full border rounded-lg px-4 py-3">

<option
value="Published"
${listing.status==="Published"?"selected":""}>
Published
</option>

<option
value="Draft"
${listing.status==="Draft"?"selected":""}>
Draft
</option>

</select>

</div>

<div class="flex items-center pt-8">

<label class="flex items-center gap-3">

<input
type="checkbox"
name="featured"
${listing.featured?"checked":""}
/>

Featured Listing

</label>

</div>

</div>

<div class="pt-6 flex gap-4">

<button
type="submit"
class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">

${submitText}

</button>

<a
href="/admin/listings"
class="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100">

Cancel

</a>

</div>

</form>

`;

}
