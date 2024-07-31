// import fetch from 'node-fetch';
import axios from 'axios';

const circleCiApiToken = process.env.CIRCLECI_API_TOKEN;
const circleCiProjectSlug = `gh/${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.CIRCLE_PROJECT_REPONAME}`;
const circleCiBuildNumber = process.env.CIRCLE_BUILD_NUM;
const url = "https://chat.googleapis.com/v1/spaces/AAAA8mmXBAg/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=SWdadv404w_RiJ1fdvBYN1NyaIUmj-NjtpLpIdFj5vk"; 

async function getArtifactUrl() {
  try {
      const response = await axios.get(`https://circleci.com/api/v2/project/${circleCiProjectSlug}/${circleCiBuildNumber}/artifacts`, {
          headers: {
              'Circle-Token': circleCiApiToken
          }
      });

      const artifacts = response.data.items;
      if (artifacts.length > 0) {
          return artifacts[0].url;  // Assuming you want the first artifact's URL
      } else {
          throw new Error('No artifacts found');
      }
  } catch (error) {
      console.error('Error fetching artifacts:', error);
      throw error;
  }
}

async function sendToGoogleChat(artifactUrl) {

  const message = {
    text: `CircleCI build artifact is available at: ${artifactUrl}`
};

try {
    const response = await axios.post(url, message);
    console.log('Message sent successfully:', response.data);
} catch (error) {
    console.error('Error sending message to Google Chat:', error);
}
}


(async () => {
  try {
      const artifactUrl = await getArtifactUrl();
      await sendToGoogleChat(artifactUrl);
  } catch (error) {
      console.error('Error:', error);
  }
})();
