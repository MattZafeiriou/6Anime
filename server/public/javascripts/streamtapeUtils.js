const https = require("https")
const fs = require('fs');

function get_download_link(file_id, download_ticket, res2) {
    url = 'api.streamtape.com';
    path = `/file/dl?file=${file_id}&ticket=${download_ticket}`

    // Setting the configuration for
    // the request
    const options = {
        hostname: url,
        path: path,
        method: 'GET'
    };
    finalD = "";

    // Sending the request
    https.request(options, (res) => {
        let data = ''

        res.on('data', (chunk) => {
            data += chunk;
        });

        // Ending the response 
        res.on('end', async () => {
            try {
                finalD = JSON.parse(data)
                var url = finalD.result.url
            } catch (e) {
                console.log("Couldn\'t find URL for " + file_id)
            }
            res2.status(200).send(url);
        });

    }).on("error", (err) => {
        console.log("Error: ", err)
    }).end()
}

function get_download_ticket(file_id, login, key, res2) {

    url = 'api.streamtape.com';
    path = `/file/dlticket?file=${file_id}&login=${login}&key=${key}`

    // Setting the configuration for
    // the request
    const options = {
        hostname: url,
        path: path,
        method: 'GET'
    };
    finalD = "";

    // Sending the request
    const req = https.request(options, (res) => {
        let data = ''

        res.on('data', (chunk) => {
            data += chunk;
        });

        // Ending the response 
        res.on('end', async () => {
            finalD = JSON.parse(data)
            // parses the ticket to a new variable called ticket
            var ticket = finalD.result.ticket
            //waits 4 seconds
            console.log("Waiting 4 seconds for " + file_id + "..")
            await new Promise(r => setTimeout(r, 4000));
            // calls to get download link
            get_download_link(file_id, ticket, res2)
        });

    }).on("error", (err) => {
        console.log("Error: ", err);
    }).end()
}

module.exports = {
    get_download_link: get_download_link,
    get_download_ticket : get_download_ticket,
}