<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { faWarning } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ActionData } from './$types';
	import { session } from '$lib/stores/session';
	import { goto } from '$app/navigation';

	export let form: ActionData;
</script>

<section class="max-w-sm mx-auto">
	<div class="prose">
		<h1>Sign Up</h1>
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
				type="username"
				name="username"
				placeholder="Username..."
				class="input input-bordered w-full"
				value={form?.username ?? ''}
			/>
		</p>
		<p>
			<input
				type="password"
				name="password"
				placeholder="Password..."
				class="input input-bordered w-full"
			/>
		</p>
		<p>
			<input
				type="password"
				name="password-confirm"
				placeholder="Confirm password..."
				class="input input-bordered w-full"
			/>
		</p>
		<p class="flex items-center gap-6 mt-6">
			<button data-testid="signup" class="btn btn-primary">Sign Up</button>
			or
			<a href="/login" class="link">Log In</a>
		</p>
	</form>
</section>
