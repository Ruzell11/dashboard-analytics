export const userActivityLogs = [
    {
        userId: "user1",
        activityType: "viewed_product",
        details: {
            productId: "prod123",
            productName: "Wireless Earbuds",
        },
        timestamp: new Date("2024-11-25T10:00:00Z"),
    },
    {
        userId: "user2",
        activityType: "added_to_cart",
        details: {
            productId: "prod124",
            productName: "Gaming Mouse",
        },
        timestamp: new Date("2024-11-25T10:15:00Z"),
    },
    {
        userId: "user1",
        activityType: "purchased",
        details: {
            orderId: "order789",
            items: [
                { productId: "prod123", productName: "Wireless Earbuds", quantity: 1 },
                { productId: "prod125", productName: "Smart Watch", quantity: 1 },
            ],
            totalAmount: 150.0,
        },
        timestamp: new Date("2024-11-25T11:00:00Z"),
    },
    {
        userId: "user3",
        activityType: "searched",
        details: {
            searchQuery: "laptops under $500",
        },
        timestamp: new Date("2024-11-25T11:30:00Z"),
    },
    {
        userId: "user4",
        activityType: "viewed_product",
        details: {
            productId: "prod126",
            productName: "Mechanical Keyboard",
        },
        timestamp: new Date("2024-11-25T12:00:00Z"),
    },
];
