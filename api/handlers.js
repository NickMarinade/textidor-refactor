const fs = require('fs');
const path = require('path');
const config = require('../config');
const util = require("util");

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const unlinkPromise = util.promisify(fs.unlink);
const readdirPromise = util.promisify(fs.readdir);

// define FILES_DIR
const FILES_DIR = path.join(__dirname, '../', config.FILES_DIR);

// declare the handlers
const handlers = {
    getFiles: async (req, res, next) => {
        try {
            const list = await readdirPromise(FILES_DIR);
            res.json(list)
        } catch (err) {
            if (err && err.code === 'ENOENT') {
                res.status(404).end();
            }
            if (err) {
                next(err);
            }
        }
    },

    getFile: async (req, res, next) => {
        const fileName = req.params.name;
        
        try {
            const fileText = await readFilePromise(`${FILES_DIR}/${fileName}`, 'utf-8');
            const responseData = {
                name: fileName,
                text: fileText,
            };
            res.json(responseData);
        } catch (err) {
            if (err && err.code === 'ENOENT') {
                res.status(404).end();
            }
            if (err) {
                next(err);
            }
        }
    }

};

// export the handlers
module.exports = handlers;;
