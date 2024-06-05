const { app,output } = require('@azure/functions');

const cosmosOutput = output.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'Items',
    connection: 'CosmosDB',
    createIfNotExists: true
});

app.http('PostItems', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [cosmosOutput],
    route: 'items',
    handler: async (request, context) => {
        const data = await request.json()
        data.id = ((Math.random()+1).toString(36))
        context.extraOutputs.set(cosmosOutput, data);
        return {
            status: 200
        };
    }
});