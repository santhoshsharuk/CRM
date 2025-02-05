const { MongoClient } = require("mongodb");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    // Retrieve MONGO_URI from environment variables
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        const data = JSON.parse(event.body); // Parse incoming data

        // Connect to MongoDB
        await client.connect();
        const database = client.db("business"); // Database name
        const collection = database.collection("CRM"); // Collection name

        // Insert data into MongoDB
        const result = await collection.insertOne({
            ...data,
            createdAt: new Date(), // Add timestamp
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Data submitted successfully", result }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to save data", details: error.message }),
        };
    } finally {
        await client.close(); // Close MongoDB connection
    }
};
