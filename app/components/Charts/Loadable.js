/**
 *
 * Asynchronously loads the component for Charts
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
