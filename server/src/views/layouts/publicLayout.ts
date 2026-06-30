import { renderHead } from "@/views/partials/head";
import { renderNavbar } from "@/views/partials/navbar";
import { renderFooter } from "@/views/partials/footer";
import type { SeoData } from "@/utils/seo";

interface PublicLayoutOptions {
    seo: SeoData;
    body: string;
}
/*interface PublicLayoutOptions{
title:string;
description?:string;
body:string;
}*/

export function publicLayout({
/*title,
description,*/
seo,
body
}:PublicLayoutOptions){

return`

<!DOCTYPE html>

<html lang="en">

${renderHead(seo/*title,description*/)}

<body class="bg-slate-50 text-slate-800">

${renderNavbar()}

<main>

${body}

</main>

${renderFooter()}

<button
id="scrollTop"
class="hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg">

↑

</button>

<script src="/static/js/app.js"></script>

</body>

</html>

`;

}