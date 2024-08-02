const burrito_api = require('../app');
const request = require("supertest");


describe("GET /api/burrito", () => {
    test("Gets the current menu", async () => {
        const response = await request(burrito_api.app).get("/api/burrito");
        //console.log(response.body);
        let menu = response.body;
        expect(response.statusCode).toBe(200);
        expect(menu.menu_items[0]).toEqual("Chicken Burrito"); 

    });

});

describe("GET /api/orders", () => {
    test("Gets the current list of orders after inputting an order", async () => {

        const send_data = await request(burrito_api.app).post("/api/orders?name=Chicken Burrito&size=xl&quant=5");
        const send_data1 = await request(burrito_api.app).post("/api/orders?name=Shrimp Burrito&size=regular&quant=1");

        //console.log(send_data);
        const response = await request(burrito_api.app).get("/api/orders");
        //console.log(response.body);

        expect(response.body.items[0].burrito.name).toEqual("Chicken Burrito");
        expect(response.body.items[0].burrito.size).toEqual("xl");
        expect(response.body.items[0].quantity).toEqual("5");


    });

});


describe("GET /api/orders/", () => {
    test("Gets the current list of orders", async () => {
        const response = await request(burrito_api.app).get("/api/orders/");
        console.log(response.body);

        expect(response.body.items).toHaveLength(2);
        expect(response.body.items[1].burrito.name).toEqual("Shrimp Burrito");
        expect(response.body.items[1].burrito.size).toEqual("regular");
        expect(response.body.items[1].quantity).toEqual("1");
        expect(response.body.total_cost).toEqual(28);
       

    });

});


describe("GET /api/orders/:id", () => {
    test("", async () => {

        const response = await request(burrito_api.app).get("/api/orders/1");
        console.log(response.body);
        expect(response.body.burrito.name).toEqual("Shrimp Burrito");
        expect(response.body.burrito.price).toEqual(3);
        expect(response.body.quantity).toEqual("1");

    });
    
});
