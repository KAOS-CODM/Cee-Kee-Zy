(() => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        const error = document.getElementById('error');
        if (error) {
          error.classList.remove('hidden');
          error.textContent = json.error || 'Login failed';
        }
        return;
      }

      window.location = '/admin/listings';
    } catch (err) {
      const error = document.getElementById('error');
      if (error) {
        error.classList.remove('hidden');
        error.textContent = 'Network error';
      }
    }
  });
})();

