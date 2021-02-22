// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: process.env["REGION"]});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: process.env["APIVERSION"]});

const send_SQS_message = (request_body) => {   
    command = request_body['command']
    execute_at = request_body['execute_at']

    now = new Date()
    now_str = now.toLocaleString('en-US', { timeZone: 'PST' })
    request_datetime = new Date(`${now_str.substring(0,now_str.search(','))}, ${request_body['execute_at']} PST`)
    delay_seconds = parseInt((request_datetime - now)/1000)

    var params = {
        // Remove DelaySeconds parameter and value for FIFO queues
        DelaySeconds: delay_seconds,
        MessageAttributes: {},    // Used for custom attributes, not required
        MessageBody: request_body,
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: process.env["SQS_QUEUE_URL"]
    };
    
    sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log("Error", err);
            return {'code':500,'message':`Error: unable to schedule message - ${err}`}
        } else {
            console.log("Success", data.MessageId);
        }
    });

    return {'code':200,'message':`Scheduled command ${command} for ${execute_at}`}
}

module.exports = send_SQS_message