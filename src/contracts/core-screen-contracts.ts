import type { CoreScreenSlug, ScreenContract } from './screen-contract';
import { getRouteScreenContract } from './route-screen-contracts';

export const coreScreenContracts: Record<CoreScreenSlug, ScreenContract> = {
  dashboard: getRouteScreenContract('dashboard'),
  protect: getRouteScreenContract('protect'),
  grow: getRouteScreenContract('grow'),
  execute: getRouteScreenContract('execute'),
  govern: getRouteScreenContract('govern'),
  settings: getRouteScreenContract('settings'),
};

export function getCoreScreenContract(slug: CoreScreenSlug): ScreenContract {
  return coreScreenContracts[slug];
}
