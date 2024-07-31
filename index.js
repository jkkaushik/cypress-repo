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
// const buildNumber = process.env.CIRCLE_BUILD_NUM; // This is automatically set by CircleCI


// const projectUsername = process.env.CIRCLE_PROJECT_USERNAME;
// const projectReponame = process.env.CIRCLE_PROJECT_REPONAME;

// console.log('Build Number:', buildNumber);
// console.log('Project Username:', projectUsername);
// console.log('Project Reponame:', projectReponame);


// const projectSlug = `${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.CIRCLE_PROJECT_REPONAME}`; // Construct the project slug
// const artifactUrl = `https://circleci.com/gh/${projectSlug}/${buildNumber}/artifacts/0/cypress_report/index.html`;

// Get the CircleCI pipeline and job details from environment variables
const pipelineId = process.env.CIRCLE_PIPELINE_ID;
const workflowId = process.env.CIRCLE_WORKFLOW_ID;
const jobId = process.env.CIRCLE_BUILD_NUM; // Job ID is typically the build number

console.log('Pipeline ID:', pipelineId);
console.log('Workflow ID:', workflowId);
console.log('Job ID:', jobId);

const artifactUrl = `https://app.circleci.com/pipelines/circleci/${pipelineId}/workflows/${workflowId}/jobs/${jobId}/artifacts/0/cypress_report/index.html`;


console.log('Artifact URL:', artifactUrl);
// Call the webhook function with the artifact URL
webhook(artifactUrl).then(res => console.log(res));
