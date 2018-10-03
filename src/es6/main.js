'use strict';

import App from './modules/App';

/**
 * When the document is ready, initialize the application
 */
$(() => {
    new App('#canvas', 10);
});
