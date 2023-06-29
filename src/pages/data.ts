import type { APIContext } from 'astro';

// File routes export a get() function, which gets called to generate the file.
// Return an object with `body` to save the file contents in your final build.
// If you export a post() function, you can catch post requests, and respond accordingly
export async function post({ request, cookies, redirect }: APIContext) {
  const errors = {
    email: '',
  };

  const formData = await request.formData();

  const email = formData.get('email');

  cookies.set('data', {
    email,
  });

  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (typeof email !== 'string' || !emailRegExp.test(email)) {
    errors.email += 'Valid email required';
  }

  if (Object.values(errors).some(e => e !== '')) {
    cookies.set('errors', errors);

    return redirect('/', 301);
  }

  cookies.set('success', 'done');
  return redirect('/thank-you', 301);
}
