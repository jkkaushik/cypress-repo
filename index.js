/**
 * Sends asynchronous message to Google Chat
 * @return {Object} response
 */
async function webhook() {
  // const reportPath = 'cypress/reports/html/index.html';
    const url = "https://chat.googleapis.com/v1/spaces/AAAA8mmXBAg/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=SWdadv404w_RiJ1fdvBYN1NyaIUmj-NjtpLpIdFj5vk"
    const res = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=UTF-8"},
      body: JSON.stringify({text: "Hello from a Node script!"})
    });
    return await res.json();
  }
  
  webhook().then(res => console.log(res));