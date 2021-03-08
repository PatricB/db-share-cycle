/* eslint-env node */
const path = require("path");
const fs = require("fs");

let custom;
try {
    custom = require("./vue.config.custom.js");
} catch (e) {
    custom = {};
}

const host = process.env.VUE_APP_DEV_SERVER || "http://sandbox.test";

process.env.VUE_APP_ASSETS_PATH = process.env.NODE_ENV === 'production' ? '/vue-app/' : '/';

// vue.config.js
module.exports = {
    outputDir: process.env.NODE_ENV === 'production' ? '../../web/vue-app' : 'dist',
    css: {
        loaderOptions: {
            sass: {
                additionalData: fs.readFileSync(
                    "./src/main.scss",
                    "utf-8"
                )
            }
        }
    },
    lintOnSave: 'error',
    productionSourceMap: false,
    configureWebpack: () => {
        let custom = {
            resolve: {
                modules: [path.resolve("./node_modules")],
                alias: {
                    vue$: "vue/dist/vue.esm.js"
                }
            }
        };

        if (process.env.NODE_ENV === "production") {
            custom.output = {
                filename: "js/[name].js"
            };
        }

        return custom;
    },
    chainWebpack: config => {
        config.optimization.delete('splitChunks');
        config.when(process.env.NODE_ENV === "production", plugin => {
            plugin
                .plugin("extract-css")
                .tap(([options, ...args]) => [
                    Object.assign({}, options, { filename: "css/[name].css" }),
                    ...args
                ]);
        });
    },
    devServer: Object.assign({
        proxy: {
            "/api": {
                target: host
            }
        }
    }, custom),
};
