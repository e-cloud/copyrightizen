const chai = require('chai');
const chaiFiles = require('chai-files');
const path = require('path');
const fs = require('fs-extra');

chai.use(chaiFiles);

const {file} = chaiFiles;

function getSourceFile(subPath) {
    return fs.readFile(path.resolve(__dirname, '__sources__', subPath), 'utf8');
}

function getBaselineFile(subPath) {
    return fs.readFile(path.resolve(__dirname, '__baselines__', subPath), 'utf8');
}

function getTemplate(subPath) {
    return fs.readFile(path.resolve(__dirname, 'templates', subPath), 'utf8');
}

module.exports = {
    getSourceFile,
    getBaselineFile,
    getTemplate,
}
