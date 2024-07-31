import fetch from 'node-fetch';

async function webhook(artifactUrl) {
  const url = "https://chat.googleapis.com/v1/spaces/AAAA8mmXBAg/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=SWdadv404w_RiJ1fdvBYN1NyaIUmj-NjtpLpIdFj5vk"; // Replace with your actual webhook URL

  // Create the message with the artifact URL
  const messageText = `Cypress Test Report: [View the report here](${artifactUrl})`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=UTF-8"},
      body: JSON.stringify({text: messageText})
    });
    return await res.json();
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Get the CircleCI build number and project slug from environment variables
const buildNumber = process.env.CIRCLE_BUILD_NUM; // This is automatically set by CircleCI
const projectSlug = `${process.env.jatin_kaushik}/${process.env.test-circleci}`; // Construct the project slug
const artifactUrl = `https://circleci.com/gh/${projectSlug}/${buildNumber}/artifacts/0/cypress_report/index.html`;

// Call the webhook function with the artifact URL
webhook(artifactUrl).then(res => console.log(res));
