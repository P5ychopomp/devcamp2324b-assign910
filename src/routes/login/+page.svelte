<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { session } from '$lib/stores/session';
	import { faWarning } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<section class="max-w-sm mx-auto">
	<div class="prose">
		<h1 class="">Log In</h1>
	</div>
	<form
		class="flex flex-col gap-6 my-6"
		method="POST"
		use:enhance={() =>
			async ({ result }) => {
				await applyAction(result);

				if (result.type === 'success') {
					const user = result.data?.user;
					if (user) $session.user = user;
					await goto('/dashboard');
				}
			}}
	>
		{#if form?.error}
			<div class="alert alert-error">
				<Fa icon={faWarning} />
				{form.error}
			</div>
		{/if}
		<p>
			<input
				autocomplete="username"
				autocorrect="off"
				type="username"
				name="username"
				placeholder="Username..."
				class="input input-bordered w-full"
				required
				value={form?.username ?? ''}
			/>
		</p>
		<p>
			<input
				autocomplete="current-password"
				type="password"
				name="password"
				placeholder="Password..."
				class="input input-bordered w-full"
				required
			/>
		</p>
		<p class="flex items-center gap-6 mt-6">
			<button class="btn btn-primary">Log In</button>
			or
			<a href="/signup" class="link">Sign Up</a>
		</p>
	</form>
</section>
