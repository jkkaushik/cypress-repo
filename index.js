import fetch from 'node-fetch';

const yxz='';
const buildNum = process.env.CIRCLE_BUILD_NUM;
const vcsType = process.env.CIRCLE_PROJECT_VCS_TYPE;
const username = process.env.CIRCLE_PROJECT_USERNAME;
const project = process.env.CIRCLE_PROJECT_REPONAME;

async function sendToGoogleChat() {
    const url = "https://chat.googleapis.com/v1/spaces/AAAA8mmXBAg/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=SWdadv404w_RiJ1fdvBYN1NyaIUmj-NjtpLpIdFj5vk"
    const message = {
      text: `Build Successful!! Get the report from the artifacts.... Build Number: ${buildNum}, username: ${username}, Repo-Name: ${project}`
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
          await sendToGoogleChat();
      } catch (error) {
          console.error('Error:', error);
      }
    })();