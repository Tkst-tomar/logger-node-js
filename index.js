const express = require("express");
const expressWinston = require("express-winston");
const { transports, format } = require("winston");
const app = express();
const data = require('./data.json')
const { logger, errorLogger, apiLogger } = require('./logger')

// require('winston-mongodb')         //! Need to run npm i winston-mongodb

app.use(
    expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true,
    })
);

app.get("/getAllData", (req, res, next) => {
    try {
        res.status(200).send(data);
        apiLogger.info('Success Message')
    } catch (error) {
        apiLogger.error('Error Message' + error)
        console.log(error);
    }
});

app.get("/getData", (req, res, next) => {
    try {
        let resp = []
        let { id, first_name, last_name, email, gender, age } = req.query
        // console.log("PARMAS", id, first_name, last_name, email, gender, age);
        if (id) {
            data.forEach(info => {
                if (info.id == id) {
                    resp.push(info)
                }
            })
        }
        if (first_name) {
            data.forEach(info => {
                if (info.first_name == first_name) {
                    resp.push(info)
                }
            })
        }
        if (last_name) {
            data.forEach(info => {
                if (info.last_name == last_name) {
                    resp.push(info)
                }
            })
        }
        if (email) {
            data.forEach(info => {
                if (info.email == email) {
                    resp.push(info)
                }
            })
        }
        if (gender) {
            data.forEach(info => {
                if (info.gender == gender) {
                    resp.push(info)
                }
            })
        }
        if (age) {
            data.forEach(info => {
                if (info.age == age) {
                    resp.push(info)
                }
            })
        }
        // For MongoDB, this could be the aggrigate fot above code,
        // mongoDBCode.find({ $or: [{ first_name }, { id }, { last_name }, { gender }, { age }, { email }] }).exec()
        res.status(200).send(resp);
        apiLogger.info('Success Message')
    } catch (error) {
        apiLogger.error('Error Message' + error)
        console.log(error);
    }
});

app.use(
    expressWinston.errorLogger({
        winstonInstance: errorLogger,
        statusLevels: true,
    })
);

app.listen(3000, () => {
    console.log("SERVER LISTENING ON PORT >>>>> 3000");
});
