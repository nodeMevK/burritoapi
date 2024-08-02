// ask question if 

const express = require("express");
const app = express();

//var list = [];

function Burrito(name, size) {
    this.name = name;
    this.size = size;
    this.options = null;
    // size needs to be correctly labeled for this to work 
    this.price = null;

}


const pricing ={
    regular: 3,
    xl: 5,
    opt: 1
};


// has items and total cost 
const Order = {
    items: [],
    total_cost: null

};

// burrito and quantity
function Order_item(burrito, quantity){
    this.burrito = burrito;
    this.quantity = quantity;
};

const orders = [];

const menu = {
    menu_items: ["Chicken Burrito", "Cheese Burrito", "Shrimp Burrito"],
    options: ["Tomatoes", "Onions", "Pickles"],
    sizes: ["Regular", "XL"]
};

function calculateCost(size, options){
    //console.log("calculating cost");
    //console.log(size);
    //console.log(options);
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


function calculateTotalCost(){


}




app.listen(3000, () => {
    console.log("server running on port 3000");
})

app.get("/api/burrito", (req, res, next) => {
    res.json(menu);
    //res.json(["Tony","Burrito"]);
   });

app.get("/api/orders", (req, res, next) => {
    res.json(Order);
   });
   
app.get("/api/orders/id", (req, res, next) => {
    res.json(["Blank2"]);
   });


// must query these params "name", "size", "options", "quant"   
app.post("/api/orders", (req, res, next) => {

    console.log(req.query);

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

    //let checkout_order = new Order();
    Order.items.push(checkout_item);

    /*
    let final_price;
    for (items in checkout_order.items){
        //final_price += items.burrito.price;
        console.log(items);
    }

    checkout_order.total_cost = final_price;
    orders.push(checkout_order);
    */

    res.json(req.query.quant + " " + req.query.size + " " + req.query.name + " was added to the order");

   });