const axios = require('axios');
const { response } = require('express');
const get_api_endpoint = require('./command_api_lookup')

const handle_command = async (request_body) => {
    response
    now = new Date()
    now_str = now.toLocaleString('en-US', { timeZone: 'PST' })
    request_datetime = new Date(`${now_str.substring(0,now_str.search(','))}, ${request_body['execute_at']} PST`)
    
    if (request_datetime - now <= 0) {
        // request_datetime is at a time earlier than today,
        // execute command now
        response = await execute_command(request_body)
    } else {
        // request_datetime is at a time later than today,
        // execute command later
        response = await schedule_command(request_body)
    }

    return response
};

const schedule_command = async (request_body) => {
    // TODO: Implement
    var response = {'code':200,'message': 'success'}
    return response
};

const execute_command = async (request_body) => {
    // First, wake vehicle before executing any other commands
    if (!wake_vehicle(request_body)) {
        response = {'code':401, 'message': `Unable to wake vehicle`}
        return response
    }

    command = request_body['command']
    vehicle_id = request_body['vehicle_id']
    access_token = request_body['access_token']
    response = {'code':500,'message':null}
    api_endpoint = get_api_endpoint(vehicle_id, command)
    
    if (!api_endpoint) {
        response = {'code':401, 'message': `Invalid command: ${command}`}
        return response
    }

    await axios
        .post(api_endpoint, {}, {
            headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
            if (res.status == 200 && res['data'] && res['data']['response']['result']) {
                response = {'code':res.status,'message':`successfully executed command: ${command}`}
            } else {
                response = {'code':res.status,'message':`Error: ${res}`}
            }
        })
        .catch((error) => {
            response = {'code':401,'message':`${error}. Is your token valid?`}
        });
    return response
}

const wake_vehicle = async (request_body) => {
    vehicle_id = request_body['vehicle_id']
    access_token = request_body['access_token']
    api_endpoint = get_api_endpoint(vehicle_id, "wake")

    RETRIES = 0
    MAX_RETRIES = 3

    while (RETRIES < MAX_RETRIES) {
        await axios
            .post(api_endpoint, {}, {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            .then((res) => {
                if (res.status == 200 && res['data'] && res['data']['response']['state'] == "online") {
                    return true
                } else {
                    RETRIES++
                }
            })
            .catch((error) => {
                break
            });
        }
    return false
}

module.exports = {
    handle_command: handle_command
}