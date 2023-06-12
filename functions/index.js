const corsServer = corsAnywhere.createServer({
    originWhitelist: [
        'http://localhost:3000',
        'http://localhost:5000',
        'https://littlemomster.be', //call from
        'https://rest.pay.nl' //call to
    ],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

const corsHandler = cors({ origin: true });

exports.proxy = onRequest((request, response) => {
    corsHandler(request, response, () => {
        corsServer.emit('request', request, response);
    })
});
