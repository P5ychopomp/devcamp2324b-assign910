import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { expect, it } from 'vitest';
import Header from '../routes/Header.svelte';

it('BONUS) [10 PTS] hAcKEr_kAbA', async () => {
  await render(Header);
  expect(screen.getByRole('link', { name: 'imissher' }));
});