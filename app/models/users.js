"use strict";

const Memcached = require('memcached'),
    Q = require("q");
let memcached = new Memcached("localhost:11211");

module.exports = {
    getById: (id) => {
        return new Promise((resolve, reject) => {
            memcached.get(id, function (err, content) {
                if (err) reject(err);
                try {
                    if (content) {
                        resolve(content.count.toString());
                    }
                    else {
                        resolve("User with id:" + id + ", don't exist");
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    },
    add: (params, id) => {
        return new Promise((resolve, reject) => {
            memcached.set(id, params, 0, function(err){
                if (err) reject(err);
                resolve (Number(id));
            });
        });
    },
    remove: (id) => {
        return new Promise((resolve, reject) => {
            memcached.del(id, function (err, content) {
                if (err) {
                    reject(err);
                }
                if (content) {
                    resolve(`User id:${id} deleted`);
                }
                else {
                    resolve(`User with id:${id} don't exist`);
                }
            });
        })

    }
};
