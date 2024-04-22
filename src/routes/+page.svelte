<script lang="ts">
	import { session } from "$lib/stores/session";
</script>

<div class="prose mx-auto justify-center">
	<h1>Fix me please 🥺</h1>
	<p>
		This web app is rated ERR. It contains uncaught errors 💥 and bugs 🪲, which may not be suitable for general audiences. Strong SvelteKit guidance is advised.
	</p>
	<p>
		In this assignment, you will be working on improving the error handling, implementing hooks, and enhancing prerendering in a SvelteKit web app. The goal is to enhance the user registration and login experience by fixing bugs and ensuring smooth navigation.
	</p>
	<div class="w-full border-b border-gray-300 opacity-20"></div>
	<p>
		This is based on SvelteKit Auth Example, which is licensed under the MIT License. The original author of SvelteKit Auth Example is Dana Woodman.
	</p>
	<p>
		<a
			href="https://github.com/danawoodman/sveltekit-auth-example"
			target="_blank"
			rel="noopen">Checkout the source code here</a
		>.
	</p>
	<p class="flex items-center gap-4 mt-12">
		{#if $session?.user}
			<a href="/dashboard" class="btn btn-primary">Dashboard</a>
			<a href="/data" class="btn btn-secondary">Data</a>
			<a href="/logout" class="btn">Logout</a>
		{:else}
			<a href="/signup" class="btn btn-primary">Sign Up</a>
			<a href="/login" class="btn">Log In</a>
		{/if}
	</p>
</div>
