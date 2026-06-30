import { renderAdminLayout } from "@/views/admin/layout";

interface DashboardData {
    total: number;
    published: number;
    drafts: number;
    featured: number;
}

export function renderDashboard(
    stats: DashboardData
): string {

    return renderAdminLayout({
        title: "Dashboard",
        currentPage: "dashboard",

        content: `
<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    <div class="bg-white rounded-xl shadow p-6">
        <p class="text-gray-500 text-sm uppercase">
            Total Listings
        </p>

        <h2 class="mt-3 text-4xl font-bold text-slate-800">
            ${stats.total}
        </h2>
    </div>

    <div class="bg-white rounded-xl shadow p-6">
        <p class="text-gray-500 text-sm uppercase">
            Published
        </p>

        <h2 class="mt-3 text-4xl font-bold text-green-600">
            ${stats.published}
        </h2>
    </div>

    <div class="bg-white rounded-xl shadow p-6">
        <p class="text-gray-500 text-sm uppercase">
            Drafts
        </p>

        <h2 class="mt-3 text-4xl font-bold text-yellow-500">
            ${stats.drafts}
        </h2>
    </div>

    <div class="bg-white rounded-xl shadow p-6">
        <p class="text-gray-500 text-sm uppercase">
            Featured
        </p>

        <h2 class="mt-3 text-4xl font-bold text-blue-600">
            ${stats.featured}
        </h2>
    </div>

</div>

<div class="mt-10 bg-white rounded-xl shadow">

    <div class="border-b px-6 py-4">

        <h3 class="text-xl font-semibold">

            Quick Actions

        </h3>

    </div>

    <div class="p-6 grid md:grid-cols-3 gap-5">

        <a
            href="/admin/listings/create"
            class="rounded-lg bg-blue-600 text-white text-center py-4 hover:bg-blue-700">

            ➕ Create Listing

        </a>

        <a
            href="/admin/listings"
            class="rounded-lg bg-green-600 text-white text-center py-4 hover:bg-green-700">

            📋 Manage Listings

        </a>

        <a
            href="/"
            target="_blank"
            class="rounded-lg bg-slate-800 text-white text-center py-4 hover:bg-slate-900">

            🌍 View Website

        </a>

    </div>

</div>
`
    });

}
