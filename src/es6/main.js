"use strict";

import Canvas from './modules/Canvas';

/**
 * When the document is ready, initialize the application
 */
$(() => {
    new Canvas("#canvas", 10);
});
