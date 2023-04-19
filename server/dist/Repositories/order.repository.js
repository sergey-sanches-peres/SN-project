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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
class OrderRepository {
    create(productOrder, idUser, uniqId, generalPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield (0, db_1.connection)();
                const response = yield conn.query('INSERT INTO orders (uniq_order_id, product_id, cart_quantity, full_product_price, general_price, buyer_id) VALUES (?, ?, ?, ?, ?, ?);', [
                    uniqId,
                    productOrder.id,
                    productOrder.cart_quantity,
                    productOrder.full_price,
                    generalPrice,
                    idUser
                ]);
                yield conn.end();
            }
            catch (e) {
                throw new Error("ОшибОчка");
            }
        });
    }
    getProductsByUserId(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield (0, db_1.connection)();
                const result = yield conn.query('SELECT * FROM orders LEFT JOIN products ON orders.product_id = products.id_product WHERE buyer_id = ? ORDER BY id_order DESC;', idUser);
                yield conn.end();
                return result[0];
            }
            catch (e) {
                throw new Error("ОшибОчка");
            }
        });
    }
}
exports.default = new OrderRepository;
