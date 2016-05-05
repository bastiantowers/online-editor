module.exports = function($) {
    var bundles = {};

    bundles.application__all = [
        './node_modules/html2canvas/dist/html2canvas.min.js',
        './src/scripts/main.js'
    ];

    return bundles;
};
