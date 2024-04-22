<script lang="ts">
	import "../app.postcss";
	import type { LayoutData } from "./$types";
	import { page } from "$app/stores";
	import Header from "./Header.svelte";
	import { session } from "$lib/stores/session";
	import "../app.css";

	export let data: LayoutData;

	$: title = $page.data?.title ? $page.data.title : "Home";

	$: if (data?.user) $session.user = data.user;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Header />

<main class="max-w-screen-xl mx-auto my-20 px-6">
	<slot />
</main>