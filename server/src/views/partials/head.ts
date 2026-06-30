import type { SeoData } from "../../utils/seo";

export function renderHead(
    seo: SeoData
): string {

    return `
<head>

<meta charset="UTF-8"/>

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
/>

<title>${seo.title}</title>

<meta
    name="description"
    content="${seo.description}"
/>

${
    seo.noIndex
        ? `<meta name="robots" content="noindex,nofollow">`
        : `<meta name="robots" content="index,follow">`
}

<link
    rel="canonical"
    href="${seo.canonical ?? ""}"
>

<meta
    property="og:type"
    content="${seo.type ?? "website"}"
/>

<meta
    property="og:title"
    content="${seo.title}"
/>

<meta
    property="og:description"
    content="${seo.description}"
/>

<meta
    property="og:url"
    content="${seo.canonical ?? ""}"
/>

<meta
    property="og:image"
    content="${seo.image ?? "/static/icons/favicon.ico"}"
/>

<meta
    name="twitter:card"
    content="summary_large_image"
/>

<meta
    name="twitter:title"
    content="${seo.title}"
/>

<meta
    name="twitter:description"
    content="${seo.description}"
/>

<meta
    name="twitter:image"
    content="${seo.image ?? "/static/icons/favicon.ico"}"
/>

<link
    rel="icon"
    href="/static/icons/favicon.ico"
/>

<link
    rel="stylesheet"
    href="/static/css/styles.css"
/>

<link
rel="stylesheet"
href="/static/assets/font-awesome/css/all.min.css"
/>

</head>
`;
}

/*export function renderHead(
  title: string,
  description = 'CEE-KEE-ZY Listing'
): string {
  return `
<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
/>

<title>${title}</title>

<meta
    name="description"
    content="${description}"
/>

<link
    rel="icon"
    href="/static/icons/favicon.ico"
/>

<link
    rel="stylesheet"
    href="/static/css/styles.css"
/>

</head>
`;
}*/