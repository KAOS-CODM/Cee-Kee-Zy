export function renderEmptyState(message: string): string {
    return `
<section class="text-center py-16">

    <h2 class="text-2xl font-semibold mb-3">

        Nothing to display

    </h2>

    <p class="text-gray-500">

        ${message}

    </p>

</section>
`;
}