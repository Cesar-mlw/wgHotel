/**
 *
 * Asynchronously loads the component for DinerStock
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
