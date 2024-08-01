import fetch from 'node-fetch';

const circleCiToken = process.env.CIRCLECI_TOKEN;
const vcsType = 'github'; // Change to your VCS type (e.g., 'github', 'bitbucket')
const username = 'jkkaushik'; // Replace with your GitHub username
const project = 'circleci'; // Replace with your project name (repository)
const buildNum = process.env.CIRCLE_BUILD_NUM;

async function getArtifactUrls() {
    try {
        // Fetch artifacts for the specified build
        const response = await fetch(`https://circleci.com/api/v2/project/${vcsType}/${username}/${project}/build/${buildNum}/artifacts`, {
            method: 'GET',
            headers: {
                'Circle-Token': circleCiToken,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Log the artifact URLs
        console.log('Artifact URLs:');
        data.items.forEach(artifact => {
            console.log(artifact.url);
        });
    } catch (error) {
        console.error('Failed to fetch artifact URLs:', error);
    }
};

async function sendToGoogleChat(artifactUrl) {
    // const url = "https://chat.googleapis.com/v1/spaces/AAAA8mmXBAg/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=SWdadv404w_RiJ1fdvBYN1NyaIUmj-NjtpLpIdFj5vk"
    const url = process.env.GCHAT_WEBHOOK_URL;
    const message = {
      text: `Build Successful!! Get the report from the artifacts: ${artifactUrl}`
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=UTF-8"},
      body: JSON.stringify(message)
    });
    return await res.json();
  }

  (async () => {
      try {
          const artifactUrl = await getArtifactUrls();
          await sendToGoogleChat(artifactUrl);
      } catch (error) {
          console.error('Error:', error);
      }
    })();