export interface AdminLayoutOptions {
    title: string;
    currentPage?:
        | "dashboard"
        | "listings"
        | "create"
        | "settings";

    content: string;
}

export function renderAdminLayout({
    title,
    currentPage,
    content,
}: AdminLayoutOptions): string {

    const active = (page: string) =>
        currentPage === page
            ? "bg-blue-700 text-white"
            : "text-slate-300 hover:bg-slate-700 hover:text-white";

    return `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
/>

<title>${title}</title>

<link rel="stylesheet" href="/static/css/styles.css">

<link
href="/static/assets/font-awesome/css/all.min.css"
rel="stylesheet"
/>

</head>

<body class="bg-slate-100">

<div class="min-h-screen flex">

    <!-- Sidebar -->

    <aside
        class="w-72 bg-slate-900 text-white flex flex-col">

        <div
            class="p-6 border-b border-slate-800">

            <h1
                class="text-2xl font-bold">

                Micah Properties

            </h1>

            <p
                class="text-sm text-slate-400 mt-1">

                Admin Dashboard

            </p>

        </div>

        <nav
            class="flex-1 p-4 space-y-2">

            <a
                href="/admin"
                class="flex items-center gap-3 px-4 py-3 rounded-lg transition ${active("dashboard")}">

                <i class="fas fa-chart-line w-5"></i>

                Dashboard

            </a>

            <a
                href="/admin/listings"
                class="flex items-center gap-3 px-4 py-3 rounded-lg transition ${active("listings")}">

                <i class="fas fa-building w-5"></i>

                Listings

            </a>

            <a
                href="/admin/listings/create"
                class="flex items-center gap-3 px-4 py-3 rounded-lg transition ${active("create")}">

                <i class="fas fa-plus-circle w-5"></i>

                Add Listing

            </a>

        </nav>

        <div
            class="border-t border-slate-800 p-4">

            <button
                id="logoutBtn"
                class="w-full bg-red-600 hover:bg-red-700 rounded-lg py-3 transition">

                Logout

            </button>

        </div>

    </aside>

    <!-- Main -->

    <main
        class="flex-1">

        <header
            class="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

            <div>

                <h2
                    class="text-3xl font-bold text-slate-800">

                    ${title}

                </h2>

            </div>

            <div
                class="flex items-center gap-4">

                <div
                    class="text-right">

                    <p
                        class="font-semibold">

                        Administrator

                    </p>

                    <p
                        class="text-sm text-slate-500">

                        Property Manager

                    </p>

                </div>

                <div
                    class="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">

                    A

                </div>

            </div>

        </header>

        <section
            class="p-8">

            ${content}

        </section>

    </main>

</div>

<script>

document.getElementById("logoutBtn")?.addEventListener("click", async () => {

    localStorage.removeItem("admin_token");

    window.location.href="/admin/login";

});

</script>

</body>

</html>
`;
}
