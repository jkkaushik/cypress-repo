import fs from 'fs'; // Import the 'fs' module
import fetch from 'node-fetch';

/**
 * Sends asynchronous message to Google Chat with the Cypress HTML report.
 * @return {Object} response
 */
async function webhook() {
    const reportPath = 'cypress/reports/html/index.html'; // Path to your HTML report

    // Read the HTML report
    let reportContent;
    try {
        reportContent = fs.readFileSync(reportPath, 'utf8');
    } catch (error) {
        console.error('Error reading the report file:', error);
        return;
    }

    // Prepare the message
    const message = {
        text: "Hello from a Node script! Here is the Cypress test report.",
        attachments: [
            {
                contentType: 'text/html',
                content: reportContent,
            }
        ]
    };
    const url = "https://chat.googleapis.com/v1/spaces/AAAA8mmXBAg/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=SWdadv404w_RiJ1fdvBYN1NyaIUmj-NjtpLpIdFj5vk";
    
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(message),
    });

    return await res.json();
}

// Execute the function and log the response
webhook().then(res => console.log(res)).catch(err => console.error('Error sending webhook:', err));
