<script>
	import { navigating } from '$app/stores';

	/**
	 * @type {import("@sveltejs/kit").Navigation}
	 */
	let previous;
	/**
	 * @type {number}
	 */
	let start;
	/**
	 * @type {number | null}
	 */
	let end;

	$: if ($navigating) {
		start = Date.now();
		end = null;
		previous = $navigating;
	} else {
		end = Date.now();
	}
</script>

{#if previous && end}
	<section class="prose-xl text-center mx-auto my-5">
		<p>
			navigated from {previous.from?.url.pathname} to {previous.to?.url.pathname} in
			<strong>{end - start}ms</strong>
		</p>
	</section>
{/if}

<slot />




