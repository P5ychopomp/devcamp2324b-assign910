<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const headers = [
		'ID',
		'Problem',
		'User',
		'Date',
		'Language',
		'Time',
		'Memory',
		'Points',
		'Result'
	];

	function formatDateTime(dateTimeString: string) {
		const dateTime = new Date(dateTimeString);
		return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
	}
</script>

<section>
	<h1 class="font-extrabold text-4xl my-5">Data</h1>
	<div class="items-center gap-4 overflow-y-scroll max-h-svh">
		{#if data.results.length > 0}
			<table class="divide-y divide-gray-200 ">
				<thead>
					<tr>
						{#each headers as header}
							<th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
								>{header}</th
							>
						{/each}
					</tr>
				</thead>
				<tbody class=" divide-y divide-gray-500">
					{#each data.results as result}
						<tr>
							<td class="px-6 py-4 whitespace-nowrap">{result.id}</td>
							<td class="px-6 py-4 whitespace-nowrap">{result.problem}</td>
							<td class="px-6 py-4 whitespace-nowrap">{result.user}</td>
							<td class="px-6 py-4 whitespace-nowrap">{formatDateTime(result.date)}</td>
							<td class="px-6 py-4 whitespace-nowrap">{result.language}</td>
							<td class="px-6 py-4 whitespace-nowrap">{result.time}</td>
							<td class="px-6 py-4 whitespace-nowrap">{result.memory}</td>
							<td class="px-6 py-4 whitespace-nowrap">{result.points}</td>
							<td class="px-6 py-4 whitespace-nowrap">{result.result}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
</section>
