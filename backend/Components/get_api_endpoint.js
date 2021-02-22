const command_api_endpoint = {
    "wake": "wake_up",
    "climate": "command/auto_conditioning_start"
}

/**
 * Returns the API endpoint pertaining to the vehicle and command.
 * If command is not valid, return null.
 * 
 * @param {String} vehicle_id 
 * @param {String} key 
 */
const get_api_endpoint = (vehicle_id, key) => {
    if (key in command_api_endpoint) {
        return `https://owner-api.teslamotors.com/api/1/vehicles/${vehicle_id}/${command_api_endpoint[key]}`
    } else {
        return null
    }
}

module.exports = get_api_endpoint