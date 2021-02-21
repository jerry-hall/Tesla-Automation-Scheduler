const handle_command = (request_body) => {
    var response
    var now = new Date()
    var now_str = now.toLocaleString('en-US', { timeZone: 'PST' })
    var request_datetime = new Date(`${now_str.substring(0,now_str.search(','))}, ${response['execute_at']} PST`)
    
    if (request_datetime - now <= 0) {
        switch (request_body['command']) {
            case climate:
                response = await execute_climate_command(request_body)
                break;
            case charging:
                response = await execute_charging_command(request_body)
                break;
        
            default:
                response = {'code':500, 'message': `Invalid command: ${request_body['command']}`}
        }
    } else {
        response = await schedule_command(request_body)
    }
    

    return response
};

const schedule_command = (request_body) => {
    // TODO: Implement
    var response = {'code':200,'message': 'success'}
    return response
};

const execute_climate_command = (request_body) => {
    // TODO: Implement
    var response = {'code':200,'message': 'success'}
    return response
};

const execute_charging_command = (request_body) => {
    // TODO: Implement
    var response = {'code':200,'message': 'success'}
    return response
};

module.handle_command = handle_command