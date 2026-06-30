export function renderAdminLoginPage(): string {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>

    <link rel="stylesheet" href="/static/css/styles.css">
</head>

<body class="bg-slate-100 min-h-screen flex items-center justify-center">

<div class="w-full max-w-md">

<div class="bg-white rounded-xl shadow-lg p-8">

<h1 class="text-3xl font-bold text-center mb-8">
CEE-KEE-ZY Admin
</h1>

<form id="loginForm" class="space-y-6">

<div>
<label class="block mb-2 font-medium">
Email
</label>

<input
type="email"
name="email"
required
class="w-full border rounded-lg px-4 py-3"
/>

</div>

<div>

<label class="block mb-2 font-medium">
Password
</label>

<input
type="password"
name="password"
required
class="w-full border rounded-lg px-4 py-3"
/>

</div>

<p
id="error"
class="hidden text-red-600 text-sm">
</p>

<button
class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">

Login

</button>

</form>

</div>

</div>


<script src="/static/js/admin-login.js"></script>

</body>
</html>
`;
}