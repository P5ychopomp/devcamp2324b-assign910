<script>
	import { page } from '$app/stores';
</script>

<h1>Error {$page.status}</h1>
<p>{$page.error?.message}</p>