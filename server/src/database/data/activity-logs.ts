export const userActivityLogs = [
    {
        customerId: 1,
        userId: "user1",
        activityType: "viewed_product",
        details: {
            productId: "prod123",
            productName: "Wireless Earbuds",
        },
        timestamp: new Date("2024-11-25T10:00:00Z"),
    },
    {
        customerId: 2,
        userId: "user2",
        activityType: "added_to_cart",
        details: {
            productId: "prod124",
            productName: "Gaming Mouse",
        },
        timestamp: new Date("2024-11-25T10:15:00Z"),
    },
    {
        customerId: 1,
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
        customerId: 3,
        userId: "user3",
        activityType: "searched",
        details: {
            searchQuery: "laptops under $500",
        },
        timestamp: new Date("2024-11-25T11:30:00Z"),
    },
    {
        customerId: 4,
        userId: "user4",
        activityType: "viewed_product",
        details: {
            productId: "prod126",
            productName: "Mechanical Keyboard",
        },
        timestamp: new Date("2024-11-25T12:00:00Z"),
    },
    {
        customerId: 3,
        userId: "user3",
        activityType: "added_to_cart",
        details: {
            productId: "prod127",
            productName: "USB-C Hub",
        },
        timestamp: new Date("2024-11-25T12:15:00Z"),
    },
    {
        customerId: 5,
        userId: "user5",
        activityType: "purchased",
        details: {
            orderId: "order790",
            items: [
                { productId: "prod128", productName: "Noise Cancelling Headphones", quantity: 1 },
            ],
            totalAmount: 300.0,
        },
        timestamp: new Date("2024-11-25T13:00:00Z"),
    },
    {
        customerId: 2,
        userId: "user2",
        activityType: "searched",
        details: {
            searchQuery: "best gaming laptops 2024",
        },
        timestamp: new Date("2024-11-25T13:30:00Z"),
    },
    {
        customerId: 1,
        userId: "user1",
        activityType: "added_to_cart",
        details: {
            productId: "prod129",
            productName: "Portable SSD",
        },
        timestamp: new Date("2024-11-25T14:00:00Z"),
    },
    {
        customerId: 5,
        userId: "user5",
        activityType: "viewed_product",
        details: {
            productId: "prod130",
            productName: "Smartphone Stand",
        },
        timestamp: new Date("2024-11-25T14:30:00Z"),
    },
];
