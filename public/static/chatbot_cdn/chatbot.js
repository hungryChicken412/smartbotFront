startingNodeID = 'node-0';
nodes = {};
edges = [];
const api = 'https://api.orangewaves.tech/api-info/';
const chatSection = document.getElementsByName('smartbot-section');
var chatbot = [];
function sanitizer(str) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '');
  return str.trim();
}
async function getBotData() {
  var url = api + 'chatbotHost/' + chatSection[0].id + '/';

  var resp = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('smartbot-play-button').style.display = 'block';
      return data;
    });

  chatbot = resp;
  return resp;
}
getBotData();

chatSection[0].insertAdjacentHTML(
  'afterbegin',
  `<button id="smartbot-play-button" class="smartbot-chat-btn smartbot-button" style= " display:none;">
<i class="fa-solid fa-comment"></i>
</button>

<div id="chat-popup" class="smartbot-chat-popup">
<div class="smartbot-intro">
  <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/19753/cute-cat-in-bowl-clipart-md.png"
	class="chatbot-icon" />
  <div class="smartbot-intro-information">
	<div class="smartbot-intro-title">
	  Henry 🚀
	  <div class="smartbot-status">
		🟢 Online <br> Powered By OI
	  </div>

	  <div class="border-img"></div>




	</div>



  </div>
  <button class="smartbot-close-button ">
	<span class="material-icons-outlined close">
	  <i class="fa-solid fa-xmark"></i>
	</span>
  </button>
</div>
<!-- <div class="badge">1</div> -->
<div class="smartbot-chat-area">
  <span id="established" class="" style=" color:gray;padding-top:20px;">
	You're talking to a virtual assistant
  </span>
</div>



<div class="smartbot-input-area">
  <input class="smartbot-input" type="text" id="smartbot-submit-text" placeholder="Type your message here!">
  <label for="smartbot-file-field">
	<i class="fa-solid fa-ellipsis-vertical"></i>
  </label>
  <input class="smartbot-input" type="file" disabled id="smartbot-file-field" style="display:none"
	placeholder="Type your message here!">
  <button class="smartbot-submit smartbot-button" id="submit-button">
	<i class="fa-solid fa-paper-plane"></i>
  </button>
</div>
</div>`
);
const popup = document.querySelector('.smartbot-chat-popup');
const chatBtn = document.querySelector('.smartbot-chat-btn');
const closeBtn = document.querySelector('.smartbot-close-button');
const submitBtn = document.querySelector('.smartbot-submit');
const chatArea = document.querySelector('.smartbot-chat-area');
const inputElm = document.querySelector('input');
const infopanel = document.querySelector('.smartbot-information-panel');
const endconvo = document.querySelector('#end-convo');
const startconvo = document.querySelector('#start-convo');
const startwait = document.querySelector('#established');
const typingIcon = document.querySelector('#sending-icon-display-thingy');
inputElm.disabled = true;
submitBtn.disabled = true;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
var startedConvo = false;
//   chat button toggler

chatBtn.addEventListener('click', () => {
  popup.classList.toggle('show');
  if (!startedConvo) {
    startedConvo = true;
    startConversation();
  }
});
closeBtn.addEventListener('click', () => {
  popup.classList.toggle('show');
  if (!startedConvo) {
    startedConvo = true;
  }
});
submitBtn.addEventListener('click', (e) => {
  sendMsg();
});

inputElm.addEventListener('keypress', function (e) {
  if (e.key == 'Enter') {
    sendMsg();
  }
});

token = document.getElementsByClassName('smartbot-section')[0].id;
lastNode = {};
expectingUserInput = false;
chatLog = [];
var startAudio = new Audio(
  'https://smartbotbucket.s3.ap-south-1.amazonaws.com/startding.wav'
);

var newMessageAudio = new Audio(
  'https://smartbotbucket.s3.ap-south-1.amazonaws.com/newdin.wav'
);

async function startConversation() {
  console.log('starting');

  document.getElementsByClassName('smartbot-intro-title')[0].innerHTML =
    chatbot[0]['name'] +
    `<div class="smartbot-status">🟢 Online <br> Powered By OI</div><div class="border-img"></div>`;
  document.getElementsByClassName('chatbot-icon')[0].src = chatbot[0]['avatar'];

  startAudio.play();

  nodes = JSON.parse(chatbot[0].chatbotHostData)['nodes'];
  edges = JSON.parse(chatbot[0].chatbotHostData)['edges'];
  console.log(chatbot[0]);

  var startingNode = nodes[startingNodeID];
  traverseTree(startingNode);
}
function endconversation() {
  //endconvo.remove();

  inputElm.placeholder = 'Conversation Ended';
  submitBtn.disabled = true;
  submitBtn.style.display = 'none';

  let startconvohtml = `Conversation Ended`;
  console.log(chatLog);
  //infopanel.insertAdjacentHTML("beforeend", startconvohtml);
}
// Node Specific Functions
function showMessage(node, optns) {
  if (node['type'] != 'message_node')
    throw new Error(
      'Something is wrong with your chat flow! Expected a Message_Node but got' +
        node['type']
    );

  let msg = node.data.label;
  let opts = optns;

  let temp = `
    <div class="smartbot-income-msg smartbot-msg-card">
        <span class="smartbot-username">🚀</span>
        <span class="smartbot-msg">${msg}</span>
    </div>`;

  if (opts.length > 1) {
    let options = opts;
    options.forEach((opt) => {
      temp += `
            <div class="smartbot-income-msg smartbot-msg-card smartbot-choice-msg"  onclick="choose('${
              node.id
            }','${sanitizer(opt)}')">
                <span class="smartbot-msg">${opt}</span>
                
            </div>`;
    });
  }

  chatArea.insertAdjacentHTML('beforeend', temp);
  chatLog.push([chatbot[0].name, msg]);

  chatArea.scrollTop = chatArea.scrollHeight;
  newMessageAudio.play();
}
function askQuestion(node) {
  sendMsgToUser(node.data.label.Question);
  expectingUserInput = true;
  lastNode = node.id;
  inputElm.disabled = false;
  submitBtn.disabled = false;
  console.log(lastNode);
}
function sendImage(node, link) {
  var im = `<img src="${node.data.label}" width='100px' height='100px'/>`;

  sendMsgToUser(im);
  chatLog.push([chatbot[0].name, im]);
  traverseTree(node, '');
}

async function sendLink(node) {
  var q = await fetch(
    `https://get-link-preview.herokuapp.com/?url=${node.data.label}`
  )
    .then((response) => response.json())
    .then((data) => {
      var im = `
			<div class="sm-node-link-preview" ><img src="${data.image}" width="100%" height="100px"/><a href="${node.data.label}" ref='noopener' target='_blank'>${data.title}   </a><p>${data.description}</p><div>`;
      sendMsgToUser(im);
      traverseTree(node, '');
    });
}

async function openTicket(node) {
  var q = await fetch(api + 'saveHelpdeskTicket/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },

    body: JSON.stringify({
      id: String(token),
      logs: chatLog
    })
  })
    .then((response) => response.json())
    .then((data) => {
      let msg = `Created Successfully! Your Issuer ID: ${data.issueID}`;
      sendMsgToUser(msg);
      sendMsgToUser(node.data.label);
      traverseTree(node, '');
    });
}
async function sendEmail(node) {
  console.log(node);
  var q = await fetch(api + 'sendEmail/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },

    body: JSON.stringify({
      to: node.data.label.to,
      subject: node.data.label.subject,
      message: node.data.label.message
    })
  })
    .then((response) => response.json())
    .then((data) => {
      traverseTree(node, '');
    });
}

// send msg
function choose(currentNode, n) {
  if (submitBtn.style.display == 'none') return '';
  else sendMsg(currentNode, n);
}
function sendMsg(currentNode, data) {
  let userInput = inputElm.value;

  if (data != null) {
    userInput = data;
  }
  chatLog.push(['User', userInput]);

  let temp = `<div class="smartbot-my-msg">
    <span class="smartbot-usr-msg">${userInput}</span>
    <span class="smartbot-username">😃</span>
    </div>`;

  chatArea.insertAdjacentHTML('beforeend', temp);
  chatArea.scrollTop = chatArea.scrollHeight;

  if (inputElm.value != null && expectingUserInput) {
    expectingUserInput = false;
    inputElm.disabled = true;
    submitBtn.disabled = true;
    traverseTree(nodes[lastNode], userInput);
  } else traverseTree(nodes[currentNode], userInput);

  inputElm.value = '';
}
function sendMsgToUser(msg) {
  let temp = `
    <div class="smartbot-income-msg smartbot-msg-card">
        <span class="smartbot-username">🚀</span>
        <span class="smartbot-msg">${msg}</span>
    </div>`;
  chatLog.push([chatbot[0].name, msg]);

  chatArea.insertAdjacentHTML('beforeend', temp);
  chatArea.scrollTop = chatArea.scrollHeight;
  newMessageAudio.play();
}

// Utility
function findRelations(node, edgesz) {
  var rels = [];
  edges.forEach((rel) => {
    if (rel['source'] == node['id']) {
      rels.push(rel);
    }
  });
  return rels;
}

function findOptions(node, edges, nodes) {
  var rels = findRelations(node, edges);
  var options = [];
  rels.forEach((rel) => {
    if (nodes[rel.target].type == 'user_message')
      options.push(nodes[rel.target].data.label);
  });
  return options;
}
function nextNode(node, input = '', nodes) {
  var rels = findRelations(node, edges);

  if (node.type == 'exit_node') {
    endconversation();
    return;
  } else if (node.type == 'message_node') {
    if (rels.length == 1) return nodes[rels[0]['target']];
    console.log('here');

    var q = null;
    for (let index = 0; index < rels.length; index++) {
      rel = rels[index];
      if (sanitizer(nodes[rel.target].data.label) == input) {
        q = nodes[rel.target];
        return q;
      }
    }
  } else {
    console.log('here', nodes[rels[0]['target']]);
    return nodes[rels[0]['target']];
  }
  console.log(node.type);
}

proNodes = [
  'sentiment_node',
  'analyseSentiment_node',
  'autorespond_node',
  'userstate_node',
  'document_node'
];
async function traverseTree(startingNode, input = '') {
  await delay(800);
  var node = startingNode;
  var userInput = input;
  chatArea.scrollTop = chatArea.scrollHeight;
  inputElm.disabled = true;
  console.log(node);

  if (node.type != 'exit_node') {
    node = nextNode(node, userInput, nodes);

    if (node.type == 'message_node') {
      options = findOptions(node, edges, nodes);

      if (options.length > 0) showMessage(node, options);
      else {
        showMessage(node, options);
        traverseTree(node);
        return;
      }
    } else if (node.type == 'user_message') {
      traverseTree(node);
      return;
    } else if (node.type == 'send_image') {
      sendImage(node);
    } else if (node.type == 'send_link') {
      sendLink(node);
    } else if (node.type == 'ask_question') {
      askQuestion(node);
    } else if (node.type == 'open_ticket') {
      openTicket(node);
    } else if (node.type == 'send_email') {
      sendEmail(node);
      return;
    } else if (node.type in proNodes) {
      throw new Error('Invalid OrangeWave Syntax: ' + node.type + ' Please read the documentation');
      endconversation();
      return;
    }

    }else if (node.type == 'exit_node') {
      endconversation();
      return;
    } else {
      sendMsgToUser('Sorry, Something went wrong, please contact the admin');
      endconversation();
      // Raise error
      throw new Error('Invalid node type : ' + node.type);
    }
    return;
  } else {
    console.log(' oinh');
    endconversation();
    return;
  }
}
