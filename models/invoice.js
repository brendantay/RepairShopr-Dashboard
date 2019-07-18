let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const InvoiceItem = new Schema({
    id: String,
    invoiceId: String,
    customer_business_then_name: String,
    subtotal: String,
    created_at:String,
    date:String,
});

module.exports = mongoose.model("InvoiceItem", InvoiceItem);