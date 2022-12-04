startingNodeID="node-0",nodes={},edges=[];const api="https://dolphin-app-v2zkq.ondigitalocean.app/api-info/",chatSection=document.getElementsByName("smartbot-section");var chatbot=[];async function getBotData(){var t=api+"chatbotHost/"+chatSection[0].id+"/",e=await fetch(t).then((t=>t.json())).then((t=>t));return chatbot=e,e}getBotData(),chatSection[0].insertAdjacentHTML("afterbegin",'<button class="smartbot-chat-btn smartbot-button">\n<i class="fa-solid fa-comment"></i>\n</button>\n\n<div id="chat-popup" class="smartbot-chat-popup">\n<div class="smartbot-intro">\n  <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/19753/cute-cat-in-bowl-clipart-md.png"\n\tclass="chatbot-icon" />\n  <div class="smartbot-intro-information">\n\t<div class="smartbot-intro-title">\n\t  Henry 🚀\n\t  <div class="smartbot-status">\n\t\t🟢 Online <br> Powered By OI\n\t  </div>\n\n\t  <div class="border-img"></div>\n\n\n\n\n\t</div>\n\n\n\n  </div>\n  <button class="smartbot-close-button ">\n\t<span class="material-icons-outlined close">\n\t  <i class="fa-solid fa-xmark"></i>\n\t</span>\n  </button>\n</div>\n\x3c!-- <div class="badge">1</div> --\x3e\n<div class="smartbot-chat-area">\n  <span id="established" class="" style=" color:gray;padding-top:20px;">\n\tYou\'re talking to a virtual assistent\n  </span>\n</div>\n\n\n\n<div class="smartbot-input-area">\n  <input class="smartbot-input" type="text" id="smartbot-submit-text" placeholder="Type your message here!">\n  <label for="smartbot-file-field">\n\t<i class="fa-solid fa-ellipsis-vertical"></i>\n  </label>\n  <input class="smartbot-input" type="file" disabled id="smartbot-file-field" style="display:none"\n\tplaceholder="Type your message here!">\n  <button class="smartbot-submit smartbot-button" id="submit-button">\n\t<i class="fa-solid fa-paper-plane"></i>\n  </button>\n</div>\n</div>');const popup=document.querySelector(".smartbot-chat-popup"),chatBtn=document.querySelector(".smartbot-chat-btn"),closeBtn=document.querySelector(".smartbot-close-button"),submitBtn=document.querySelector(".smartbot-submit"),chatArea=document.querySelector(".smartbot-chat-area"),inputElm=document.querySelector("input"),infopanel=document.querySelector(".smartbot-information-panel"),endconvo=document.querySelector("#end-convo"),startconvo=document.querySelector("#start-convo"),startwait=document.querySelector("#established"),typingIcon=document.querySelector("#sending-icon-display-thingy");inputElm.disabled=!0,submitBtn.disabled=!0;const delay=t=>new Promise((e=>setTimeout(e,t)));var startedConvo=!1;chatBtn.addEventListener("click",(()=>{popup.classList.toggle("show"),startedConvo||(startedConvo=!0,startConversation())})),closeBtn.addEventListener("click",(()=>{popup.classList.toggle("show"),startedConvo||(startedConvo=!0)})),submitBtn.addEventListener("click",(t=>{sendMsg()})),inputElm.addEventListener("keypress",(function(t){"Enter"==t.key&&sendMsg()})),token=document.getElementsByClassName("smartbot-section")[0].id,lastNode={},expectingUserInput=!1,chatLog=[];var startAudio=new Audio("https://smartbotbucket.s3.ap-south-1.amazonaws.com/startding.wav"),newMessageAudio=new Audio("https://smartbotbucket.s3.ap-south-1.amazonaws.com/newdin.wav");async function startConversation(){console.log("starting"),document.getElementsByClassName("smartbot-intro-title")[0].innerHTML=chatbot[0].name+'<div class="smartbot-status">🟢 Online <br> Powered By OI</div>',document.getElementsByClassName("chatbot-icon")[0].src=chatbot[0].avatar,startAudio.play(),nodes=JSON.parse(chatbot[0].chatbotHostData).nodes,edges=JSON.parse(chatbot[0].chatbotHostData).edges,console.log(chatbot[0]),traverseTree(nodes[startingNodeID])}function endconversation(){inputElm.placeholder="Conversation Ended",submitBtn.disabled=!0,submitBtn.style.display="none";console.log(chatLog)}function showMessage(t,e){if("message_node"!=t.type)throw new Error("Something is wrong with your chat flow! Expected a Message_Node but got"+t.type);let s=t.data.label,n=e,a=`\n    <div class="smartbot-income-msg smartbot-msg-card">\n        <span class="smartbot-username">🚀</span>\n        <span class="smartbot-msg">${s}</span>\n    </div>`;if(n.length>1){n.forEach((e=>{a+=`\n            <div class="smartbot-income-msg smartbot-msg-card smartbot-choice-msg"  onclick="choose('${t.id}','${e}')">\n                <span class="smartbot-msg">${e}</span>\n                \n            </div>`}))}chatArea.insertAdjacentHTML("beforeend",a),chatLog.push([chatbot[0].name,s]),chatArea.scrollTop=chatArea.scrollHeight,newMessageAudio.play()}function askQuestion(t){sendMsgToUser(t.data.label.Question),expectingUserInput=!0,lastNode=t.id,inputElm.disabled=!1}function sendImage(t,e){var s=`<img src="${t.data.label}" width='100px' height='100px'/>`;sendMsgToUser(s),chatLog.push([chatbot[0].name,s]),traverseTree(t,"")}async function sendLink(t){await fetch(`https://get-link-preview.herokuapp.com/?url=${t.data.label}`).then((t=>t.json())).then((e=>{sendMsgToUser(`\n\t\t\t<div class="sm-node-link-preview" ><img src="${e.image}" width="100%" height="100px"/><a href="${t.data.label}" ref='noopener' target='_blank'>${e.title}   </a><p>${e.description}</p><div>`),traverseTree(t,"")}))}function choose(t,e){if("none"==submitBtn.style.display)return"";sendMsg(t,e)}function sendMsg(t,e){let s=inputElm.value;null!=e&&(s=e),chatLog.push(["User",s]);let n=`<div class="smartbot-my-msg">\n    <span class="smartbot-usr-msg">${s}</span>\n    <span class="smartbot-username">😃</span>\n    </div>`;chatArea.insertAdjacentHTML("beforeend",n),chatArea.scrollTop=chatArea.scrollHeight,null!=inputElm.value&&expectingUserInput?traverseTree(nodes[lastNode],s):traverseTree(nodes[t],s),inputElm.value=""}function sendMsgToUser(t){let e=`\n    <div class="smartbot-income-msg smartbot-msg-card">\n        <span class="smartbot-username">🚀</span>\n        <span class="smartbot-msg">${t}</span>\n    </div>`;chatLog.push([chatbot[0].name,t]),chatArea.insertAdjacentHTML("beforeend",e),chatArea.scrollTop=chatArea.scrollHeight,newMessageAudio.play()}function findRelations(t,e){var s=[];return edges.forEach((e=>{e.source==t.id&&s.push(e)})),s}function findOptions(t,e,s){var n=findRelations(t,e),a=[];return n.forEach((t=>{"user_message"==s[t.target].type&&a.push(s[t.target].data.label)})),a}function nextNode(t,e="",s){var n=findRelations(t,edges);if("exit_node"!=t.type){if("message_node"!=t.type)return s[n[0].target];if(1==n.length)return s[n[0].target];for(let t=0;t<n.length;t++)if(rel=n[t],s[rel.target].data.label==e)return s[rel.target];throw new Error("unknown node")}endconversation()}async function traverseTree(t,e=""){var s;await(s=800,new Promise((t=>setTimeout(t,s))));var n=t,a=e;if(chatArea.scrollTop=chatArea.scrollHeight,inputElm.disabled=!0,"exit_node"==n.type)return console.log(" oinh"),void endconversation();if(n=nextNode(n,a,nodes),console.log(n),"message_node"==n.type){if(options=findOptions(n,edges,nodes),!(options.length>0))return showMessage(n,options),void traverseTree(n);showMessage(n,options)}else{if("user_message"==n.type)return void traverseTree(n);if("send_image"==n.type)sendImage(n);else if("send_link"==n.type)sendLink(n);else{if("ask_question"!=n.type)return void endconversation();askQuestion(n)}}}