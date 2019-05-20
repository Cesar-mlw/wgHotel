/**
 *
 * Asynchronously loads the component for StockCard
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
