"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../model/db"));
const router = (0, express_1.Router)();
router.get('/unique_serial', (req, res, next) => {
    const query = `SELECT DISTINCT "Serial_Number" FROM "readings"`;
    db_1.default.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        res.status(200).json({ result: result.rows });
    });
});
router.get('/unique_date_time', (req, res, next) => {
    const query = `SELECT DISTINCT "DateTime" FROM "readings"
                    ORDER BY "DateTime"`;
    db_1.default.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        res.status(200).json({ result: result.rows });
    });
});
router.get('/chunks/:date_time', (req, res, next) => {
    let date_time = req.params.date_time;
    const query = `SELECT "DateTime", "Serial_Number", "Device_ID", "Wattage" FROM "readings"
                    WHERE "DateTime" = '${date_time}' 
                    AND "Device_ID" in ('mains', 'always_on')
                    ORDER BY "DateTime"`;
    db_1.default.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        res.status(200).json({ result: result.rows });
    });
});
router.get('/serial/:serial_num', (req, res, next) => {
    let serial_num = req.params.serial_num;
    const query = `select * from (select "Wattage" as "wattage_mains", "DateTime" from "readings"
                                            where "Device_ID" like 'mains'
                                            and "Serial_Number" = '${serial_num}') "readings_mains"
                                    inner join
                                          (select "Wattage" as "wattage_always_on", "DateTime" from "readings"
                                            where "Device_ID" like 'always_on'
                                            and "Serial_Number" = '${serial_num}') "readings_always_on"
                                    using("DateTime");`;
    db_1.default.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        res.status(200).json({ result: result.rows });
    });
});
router.get('/id/:params', (req, res, next) => {
    let device_id = req.params.params.slice(0, req.params.params.indexOf(':'));
    let serial_num = req.params.params.slice(req.params.params.indexOf(':') + 1);
    console.log(device_id);
    console.log(serial_num);
    const query = `SELECT "Wattage", "DateTime" FROM "readings"
                            WHERE "Serial_Number" = '${serial_num}'
                          AND "Device_ID" = '${device_id}'`;
    db_1.default.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json();
        }
        res.status(200).json({ result: result.rows });
    });
});
exports.default = router;
