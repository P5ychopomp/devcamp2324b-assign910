export async function load({ parent, data }) {
	await parent();
	const { results } = data;
	return { title: 'Data 😺', results };
}
