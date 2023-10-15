const express = require('express');
const mqtt = require('mqtt');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const AtlasService = require('./services/atlas.service');

const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
const port = 8081;
const routes = require('./routes/atlas.routes');
app.use('/', routes);
const httpServer = app.listen(port, () => {
    console.log(`App is now listening on port ${port}`);
})

const mqttHost = "test.mosquitto.org";
const mqttPort = '1883';
const mqttClientID = 'Test';
const mqttConnectURL = `mqtt://${mqttHost}:${mqttPort}`;
const topic = 'BobcatTest/test';
const mqttClient = mqtt.connect(mqttConnectURL, {
    mqttClientID,
    clean: true,
    connectTimeout: 4000,
    username: '',
    password: '',
    reconnectPeriod: 1000,
})

mqttClient.on('connect', () => {
    console.log('MQTT Connection: Established.')
})

mqttClient.subscribe([topic], () => {
    console.log(`MQTT Subscribed to topic: ${topic}`)
})

mqttClient.on('message', (topic, payload) => {
    console.log(`MQTT Message Received: ${topic}: ${payload.toString()}`)
})


const wss = new WebSocket.Server({ noServer: true });
httpServer.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req)
        console.log("Socket Activity");
        const service = new AtlasService.atlasService();
        ws.on('message', async (message) => {
            let parsedMessage = JSON.parse(message);
            console.log(parsedMessage);
            if (parsedMessage.message === 'room') {
                let response  = '{' +
                    '"RoomName": ' + '"107",\n' +
                    '"Status": ' + '"Free",' + '\n' +
                    '"Building": ' + '"Stocker"\n' +
                    '}';
                ws.send(response);
            }
        });
        ws.on('close', () => {
            //Nothing
            console.log("Socket Closed")
        });
    })
})