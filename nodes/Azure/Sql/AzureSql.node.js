"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureSql = void 0;
var mssql_1 = require("mssql");
var AzureSql = /** @class */ (function () {
    function AzureSql() {
        this.description = {
            displayName: 'Azure SQL',
            name: 'azureSql',
            icon: 'file:azuresql.svg',
            group: ['input'],
            version: 1,
            description: 'Get, add and update data in Azure SQL',
            defaults: {
                name: 'Azure SQL',
            },
            // @ts-ignore
            inputs: ['main'],
            // @ts-ignore
            outputs: ['main'],
            credentials: [
                {
                    name: 'azureSql',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Execute Query',
                            value: 'executeQuery',
                            description: 'Execute an SQL query',
                            action: 'Execute a SQL query',
                        },
                        {
                            name: 'Insert',
                            value: 'insert',
                            description: 'Insert rows in database',
                            action: 'Insert rows in database',
                        },
                        {
                            name: 'Update',
                            value: 'update',
                            description: 'Update rows in database',
                            action: 'Update rows in database',
                        },
                        {
                            name: 'Delete',
                            value: 'delete',
                            description: 'Delete rows in database',
                            action: 'Delete rows in database',
                        },
                    ],
                    default: 'executeQuery',
                },
                {
                    displayName: 'Database Name',
                    name: 'database',
                    type: 'string',
                    default: '',
                    description: 'Name of the database to use. If not specified, the default database from credentials will be used.',
                    placeholder: 'Leave blank to use default from credentials',
                },
                {
                    displayName: 'Query',
                    name: 'query',
                    type: 'string',
                    displayOptions: {
                        show: {
                            operation: ['executeQuery'],
                        },
                    },
                    default: '',
                    placeholder: 'SELECT id, name FROM product WHERE id < 40',
                    required: true,
                    description: 'The SQL query to execute',
                },
            ],
        };
    }
    AzureSql.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, operation, databaseOverride, config, pool, returnItems, query, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCredentials('azureSql')];
                    case 1:
                        credentials = _a.sent();
                        // Get input data (not used in this simplified version)
                        this.getInputData();
                        operation = this.getNodeParameter('operation', 0);
                        databaseOverride = this.getNodeParameter('database', 0, '');
                        config = {
                            server: credentials.server,
                            port: credentials.port,
                            database: databaseOverride || credentials.database,
                            user: credentials.user,
                            password: credentials.password,
                            domain: credentials.domain ? credentials.domain : undefined,
                            connectionTimeout: credentials.connectTimeout,
                            requestTimeout: credentials.requestTimeout,
                            options: {
                                encrypt: credentials.tls,
                                enableArithAbort: false,
                                tdsVersion: credentials.tdsVersion,
                                trustServerCertificate: credentials.allowUnauthorizedCerts,
                            },
                        };
                        pool = new mssql_1.default.ConnectionPool(config);
                        returnItems = [];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, 8, 10]);
                        return [4 /*yield*/, pool.connect()];
                    case 3:
                        _a.sent();
                        if (!(operation === 'executeQuery')) return [3 /*break*/, 5];
                        query = this.getNodeParameter('query', 0);
                        return [4 /*yield*/, pool.request().query(query)];
                    case 4:
                        result = _a.sent();
                        if (result.recordset) {
                            returnItems = this.helpers.returnJsonArray(result.recordset);
                        }
                        else {
                            returnItems = this.helpers.returnJsonArray([{ message: 'Query executed successfully' }]);
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        // For other operations, we'll just return a success message for now
                        // In a real implementation, you would handle insert, update, delete operations
                        returnItems = this.helpers.returnJsonArray([
                            { message: "".concat(operation, " operation would be executed here with database: ").concat(config.database) },
                        ]);
                        _a.label = 6;
                    case 6: return [3 /*break*/, 10];
                    case 7:
                        error_1 = _a.sent();
                        if (this.continueOnFail()) {
                            returnItems = this.helpers.returnJsonArray({ error: error_1.message });
                        }
                        else {
                            throw error_1;
                        }
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, pool.close()];
                    case 9:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, [returnItems]];
                }
            });
        });
    };
    return AzureSql;
}());
exports.AzureSql = AzureSql;
