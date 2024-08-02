// ask question if 

const express = require("express");
const app = express();

//var list = [];

const menu = {
    menu_items: ["Chicken Burrito", "Cheese Burrito", "Shrimp Burrito"],
    options: ["Tomatoes", "Onions", "Pickles"],
    sizes: ["Regular", "XL"]
};

const pricing ={
    regular: 3,
    xl: 5,
    opt: 1
};

// has items and total cost 
const Order = {
    items: [],
    total_cost: 0

};

function Burrito(name, size) {
    this.name = name;
    this.size = size;
    this.options = null;
    // size needs to be correctly labeled for this to work 
    this.price = null;

}


// burrito and quantity
function Order_item(burrito, quantity){
    this.burrito = burrito;
    this.quantity = quantity;
};


function calculateCost(size, options){
    
    let start_price = 0;
    if (options != null){
        start_price += pricing.opt;
    }
    if (size.toLowerCase() == "regular"){
        start_price += 3;
        return start_price;

    }
    start_price += 5;
    return start_price;
};


app.listen(3000, () => {
    console.log("server running on port 3000");
})

app.get("/api/burrito", (req, res, next) => {
    res.json(menu);
    
   });

app.get("/api/orders", (req, res, next) => {
    res.json(Order);
   });
   
app.get("/api/orders/:id", (req, res, next) => {

    temp = req.params;
    res.json(Order.items[temp.id]);
  
   });

// must query these params "name", "size", "options", "quant"   
// this method is designed to push orders into order list
// this method assumes you are going to query ["name", "size", "quant"], "options is optional"
app.post("/api/orders", (req, res, next) => {

    temp = req.query;

    let checkout_burrito = new Burrito(temp.name, temp.size);
    if (temp.options == undefined){
        checkout_burrito.options = null;
    }
    else {
        checkout_burrito.options = temp.options;
    }

    checkout_burrito.price = calculateCost(checkout_burrito.size, checkout_burrito.options);
    let checkout_item = new Order_item(checkout_burrito, req.query.quant);

    Order.items.push(checkout_item);
    Order.total_cost += checkout_burrito.price * temp.quant;


    res.json(req.query.quant + " " + req.query.size + " " + req.query.name + " was added to the order");

   });

module.exports.app = app;
