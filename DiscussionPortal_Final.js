let threadElements = [];
let storedThreads = [];
let rawData = localStorage.getItem("pastelThreads");
if (rawData) {
    try {
        storedThreads = JSON.parse(rawData);
    } catch {
        storedThreads = [];
    }
}

function saveData() {
    localStorage.setItem("pastelThreads", JSON.stringify(storedThreads));
}

function addThread(subject, content) {
    storedThreads.push({
        subject,
        content,
        replies: []
    });
    saveData();
}

function buildHeader() {
    const topBar = document.createElement("div");
    topBar.innerHTML = "<h1>Discussion Portal</h1>";
    topBar.style.backgroundColor = "#a3d5d3"; 
    topBar.style.color = "#3b3a39";          
    topBar.style.padding = "16px";
    topBar.style.textAlign = "center";
    topBar.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    topBar.style.fontSize = "28px";
    topBar.style.fontWeight = "700";
    topBar.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
    topBar.style.borderBottomLeftRadius = "12px";
    topBar.style.borderBottomRightRadius = "12px";
    return topBar;
}

function buildSidebar() {
    const sidebar = document.createElement("div");
    sidebar.style.width = "35%";
    sidebar.style.backgroundColor = "#f3f4f6";
    sidebar.style.height = "90vh";
    sidebar.style.float = "left";
    sidebar.style.overflowY = "auto";
    sidebar.style.boxSizing = "border-box";
    sidebar.style.padding = "12px 18px";
    sidebar.style.borderRight = "2px solid #b3b3b3";
    sidebar.style.borderTopLeftRadius = "12px";
    sidebar.style.borderBottomLeftRadius = "12px";

    const controlBox = document.createElement("div");
    controlBox.style.display = "flex";
    controlBox.style.gap = "12px";
    controlBox.style.marginBottom = "14px";

    const newBtn = document.createElement("button");
    newBtn.textContent = "New Question form";
    newBtn.style.backgroundColor = "#8ecae6";  
    newBtn.style.border = "none";
    newBtn.style.padding = "10px 16px";
    newBtn.style.borderRadius = "10px";
    newBtn.style.cursor = "pointer";
    newBtn.style.color = "#1d3557";
    newBtn.style.fontWeight = "600";
    newBtn.style.flex = "1";
    newBtn.style.transition = "background-color 0.3s ease";
    newBtn.addEventListener("mouseenter", () => {
        newBtn.style.backgroundColor = "#219ebc";
    });
    newBtn.addEventListener("mouseleave", () => {
        newBtn.style.backgroundColor = "#8ecae6";
    });

    newBtn.addEventListener("click", () => {
        mainArea.innerHTML = "";
        mainArea.appendChild(buildForm());
    });

    const searchInput = document.createElement("input");
    searchInput.placeholder = "search questions...";
    searchInput.style.flex = "2";
    searchInput.style.padding = "10px";
    searchInput.style.border = "1.8px solid #b0bec5";
    searchInput.style.borderRadius = "10px";
    searchInput.style.fontSize = "15px";
    searchInput.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    searchInput.style.color = "#394867";
    searchInput.addEventListener("input", () => {
        const term = searchInput.value.toLowerCase();
        threadElements.forEach(({ box, title, desc }) => {
            const match = title.toLowerCase().includes(term) || desc.toLowerCase().includes(term);
            box.style.display = match ? "block" : "none";
        });
    });

    controlBox.appendChild(newBtn);
    controlBox.appendChild(searchInput);
    sidebar.appendChild(controlBox);

    return sidebar;
}

function addSidebarThread(title, desc, replies = []) {
    const box = document.createElement("div");
    box.style.backgroundColor = "#ffffff";
    box.style.padding = "14px";
    box.style.marginBottom = "10px";
    box.style.borderRadius = "12px";
    box.style.cursor = "pointer";
    box.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
    box.style.transition = "background-color 0.3s ease";

    box.addEventListener("mouseenter", () => {
        box.style.backgroundColor = "#e0f2f1";  
    });
    box.addEventListener("mouseleave", () => {
        box.style.backgroundColor = "#ffffff";
    });

    const timestamp = document.createElement("small");
    timestamp.style.color = "#6c757d";
    timestamp.textContent = new Date().toLocaleString();

    const heading = document.createElement("h3");
    heading.textContent = title;
    heading.style.margin = "8px 0 4px";
    heading.style.color = "#264653"; 

    const para = document.createElement("p");
    para.textContent = desc;
    para.style.margin = "0";
    para.style.color = "#4a4a4a";
    para.style.fontSize = "14.5px";

    box.appendChild(timestamp);
    box.appendChild(heading);
    box.appendChild(para);

    box.addEventListener("click", () => {
        mainArea.innerHTML = "";
        mainArea.appendChild(viewThread(title, desc, box, replies));
    });

    sidebar.appendChild(box);
    threadElements.push({ box, title, desc });
}

const mainArea = document.createElement("div");
mainArea.style.width = "65%";
mainArea.style.height = "90vh";
mainArea.style.float = "right";
mainArea.style.overflowY = "auto";
mainArea.style.backgroundColor = "#fefefe"; 
mainArea.style.boxSizing = "border-box";
mainArea.style.padding = "24px 28px";
mainArea.style.borderTopRightRadius = "12px";
mainArea.style.borderBottomRightRadius = "12px";
mainArea.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
mainArea.style.color = "#333333";

function buildForm() {
    const formWrapper = document.createElement("div");

    const titleInput = document.createElement("input");
    titleInput.placeholder = "Subject";
    titleInput.style.display = "block";
    titleInput.style.marginBottom = "14px";
    titleInput.style.padding = "12px";
    titleInput.style.width = "60%";
    titleInput.style.border = "1.5px solid #b0bec5";
    titleInput.style.borderRadius = "10px";
    titleInput.style.fontSize = "16px";
    titleInput.style.transition = "border-color 0.3s ease";
    titleInput.addEventListener("focus", () => {
        titleInput.style.borderColor = "#8ecae6";
    });
    titleInput.addEventListener("blur", () => {
        titleInput.style.borderColor = "#b0bec5";
    });

    const descInput = document.createElement("textarea");
    descInput.placeholder = "Question";
    descInput.style.display = "block";
    descInput.style.marginBottom = "14px";
    descInput.style.padding = "12px";
    descInput.style.width = "80%";
    descInput.style.height = "110px";
    descInput.style.border = "1.5px solid #b0bec5";
    descInput.style.borderRadius = "10px";
    descInput.style.fontSize = "16px";
    descInput.style.transition = "border-color 0.3s ease";
    descInput.addEventListener("focus", () => {
        descInput.style.borderColor = "#8ecae6";
    });
    descInput.addEventListener("blur", () => {
        descInput.style.borderColor = "#b0bec5";
    });

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.style.backgroundColor = "#8ecae6"; 
    submitBtn.style.border = "none";
    submitBtn.style.padding = "14px 26px";
    submitBtn.style.borderRadius = "12px";
    submitBtn.style.cursor = "pointer";
    submitBtn.style.color = "#1d3557"; 
    submitBtn.style.fontWeight = "700";
    submitBtn.style.fontSize = "16px";
    submitBtn.style.transition = "background-color 0.3s ease";
    submitBtn.addEventListener("mouseenter", () => {
        submitBtn.style.backgroundColor = "#219ebc";
    });
    submitBtn.addEventListener("mouseleave", () => {
        submitBtn.style.backgroundColor = "#8ecae6";
    });

    submitBtn.addEventListener("click", () => {
        const t = titleInput.value.trim();
        const d = descInput.value.trim();
        if (t && d) {
            addThread(t, d);
            addSidebarThread(t, d);
            titleInput.value = "";
            descInput.value = "";
        } else {
            alert("Please fill both fields");
        }
    });

    formWrapper.appendChild(titleInput);
    formWrapper.appendChild(descInput);
    formWrapper.appendChild(submitBtn);

    return formWrapper;
}

function viewThread(title, desc, element, replies) {
    const container = document.createElement("div");

    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.style.color = "#264653"; 
    heading.style.marginBottom = "12px";
    container.appendChild(heading);

    const para = document.createElement("p");
    para.textContent = desc;
    para.style.color = "#4a4a4a";
    para.style.fontSize = "16px";
    para.style.marginBottom = "18px";
    container.appendChild(para);

    const resolveBtn = document.createElement("button");
    resolveBtn.textContent = "Resolve";
    resolveBtn.style.backgroundColor = "#8ecae6";  
    resolveBtn.style.border = "none";
    resolveBtn.style.padding = "10px 20px";
    resolveBtn.style.marginBottom = "24px";
    resolveBtn.style.cursor = "pointer";
    resolveBtn.style.borderRadius = "10px";
    resolveBtn.style.color = "#1d3557";
    resolveBtn.style.fontWeight = "600";
    resolveBtn.style.fontSize = "15px";
    resolveBtn.style.transition = "background-color 0.3s ease";
    resolveBtn.addEventListener("mouseenter", () => {
        resolveBtn.style.backgroundColor = "#219ebc";
    });
    resolveBtn.addEventListener("mouseleave", () => {
        resolveBtn.style.backgroundColor = "#8ecae6";
    });

    resolveBtn.addEventListener("click", () => {
        sidebar.removeChild(element);
        storedThreads = storedThreads.filter(t => !(t.subject === title && t.content === desc));
        saveData();
        mainArea.innerHTML = "";
        mainArea.appendChild(buildForm());
    });

    container.appendChild(resolveBtn);

    const replySection = document.createElement("div");
    replySection.style.marginTop = "12px";
    replySection.appendChild(document.createElement("hr"));

    const replyHeading = document.createElement("h3");
    replyHeading.textContent = "Responses";
    replyHeading.style.color = "#264653";
    replyHeading.style.margin = "16px 0 10px";
    replySection.appendChild(replyHeading);

    const replyBox = document.createElement("div");
    replyBox.id = "replyBox";
    replySection.appendChild(replyBox);

    replies.forEach(r => {
        replyBox.appendChild(createReplyElement(r, storedThreads.findIndex(t => t.subject === title && t.content === desc), replies));
    });

    replySection.appendChild(addReplyForm(title, desc));

    container.appendChild(replySection);

    return container;
}

function createReplyElement(replyObj, threadIndex, parentArray) {
    const wrapper = document.createElement("div");
    wrapper.style.marginLeft = "18px";
    wrapper.style.padding = "12px";
    wrapper.style.backgroundColor = "#e7f6f2"; 
    wrapper.style.borderLeft = "3px solid #264653"; 
    wrapper.style.marginTop = "8px";
    wrapper.style.borderRadius = "8px";

    const meta = document.createElement("small");
    meta.style.color = "#617d98";
    meta.textContent = replyObj.date;
    wrapper.appendChild(meta);

    const name = document.createElement("h4");
    name.textContent = replyObj.name;
    name.style.margin = "6px 0 4px";
    name.style.color = "#1d3557";
    wrapper.appendChild(name);

    const comment = document.createElement("p");
    comment.textContent = replyObj.comment;
    comment.style.margin = "0 0 10px";
    comment.style.fontSize = "15px";
    comment.style.color = "#3a5068";
    wrapper.appendChild(comment);

    // Buttons row
    const btnRow = document.createElement("div");
    btnRow.style.display = "flex";
    btnRow.style.gap = "8px";

    const likeBtn = document.createElement("button");
    likeBtn.textContent = `👍 ${replyObj.likes || 0}`;
    likeBtn.style.border = "none";
    likeBtn.style.backgroundColor = "#90cea1";  
    likeBtn.style.borderRadius = "8px";
    likeBtn.style.padding = "5px 10px";
    likeBtn.style.cursor = "pointer";
    likeBtn.addEventListener("click", () => {
        replyObj.likes = (replyObj.likes || 0) + 1;
        likeBtn.textContent = `👍 ${replyObj.likes}`;
        saveData();
    });

    const dislikeBtn = document.createElement("button");
    dislikeBtn.textContent = `👎 ${replyObj.dislikes || 0}`;
    dislikeBtn.style.border = "none";
    dislikeBtn.style.backgroundColor = "#f7b267"; 
    dislikeBtn.style.borderRadius = "8px";
    dislikeBtn.style.padding = "5px 10px";
    dislikeBtn.style.cursor = "pointer";
    dislikeBtn.addEventListener("click", () => {
        replyObj.dislikes = (replyObj.dislikes || 0) + 1;
        dislikeBtn.textContent = `👎 ${replyObj.dislikes}`;
        saveData();
    });

    const replyBtn = document.createElement("button");
    replyBtn.textContent = "💬 Reply";
    replyBtn.style.border = "none";
    replyBtn.style.backgroundColor = "#8ecae6";
    replyBtn.style.borderRadius = "8px";
    replyBtn.style.padding = "5px 12px";
    replyBtn.style.cursor = "pointer";
    replyBtn.style.color = "#1d3557";
    replyBtn.style.fontWeight = "600";
    replyBtn.addEventListener("mouseenter", () => {
        replyBtn.style.backgroundColor = "#219ebc";
    });
    replyBtn.addEventListener("mouseleave", () => {
        replyBtn.style.backgroundColor = "#8ecae6";
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️ Delete";
    delBtn.style.border = "none";
    delBtn.style.backgroundColor = "#ff6f61"; 
    delBtn.style.borderRadius = "8px";
    delBtn.style.padding = "5px 10px";
    delBtn.style.cursor = "pointer";
    delBtn.style.color = "#fff";
    delBtn.style.fontWeight = "600";
    delBtn.addEventListener("mouseenter", () => {
        delBtn.style.backgroundColor = "#d64541";
    });
    delBtn.addEventListener("mouseleave", () => {
        delBtn.style.backgroundColor = "#ff6f61";
    });

    delBtn.addEventListener("click", () => {
        const idx = parentArray.indexOf(replyObj);
        if (idx > -1) {
            parentArray.splice(idx, 1);
            saveData();
            wrapper.remove();
        }
    });

    btnRow.appendChild(likeBtn);
    btnRow.appendChild(dislikeBtn);
    btnRow.appendChild(replyBtn);
    btnRow.appendChild(delBtn);

    wrapper.appendChild(btnRow);

    const replyForm = document.createElement("div");
    replyForm.style.display = "none";
    replyForm.style.marginTop = "8px";

    const nameInput = document.createElement("input");
    nameInput.placeholder = "Your Name";
    nameInput.style.padding = "8px";
    nameInput.style.marginRight = "8px";
    nameInput.style.borderRadius = "8px";
    nameInput.style.border = "1.5px solid #b0bec5";
    nameInput.style.fontSize = "14px";
    nameInput.style.width = "140px";
    nameInput.style.transition = "border-color 0.3s ease";
    nameInput.addEventListener("focus", () => {
        nameInput.style.borderColor = "#8ecae6";
    });
    nameInput.addEventListener("blur", () => {
        nameInput.style.borderColor = "#b0bec5";
    });

    const commentInput = document.createElement("input");
    commentInput.placeholder = "Your Comment";
    commentInput.style.padding = "8px";
    commentInput.style.borderRadius = "8px";
    commentInput.style.border = "1.5px solid #b0bec5";
    commentInput.style.fontSize = "14px";
    commentInput.style.flex = "1";
    commentInput.style.transition = "border-color 0.3s ease";
    commentInput.addEventListener("focus", () => {
        commentInput.style.borderColor = "#8ecae6";
    });
    commentInput.addEventListener("blur", () => {
        commentInput.style.borderColor = "#b0bec5";
    });

    const postBtn = document.createElement("button");
    postBtn.textContent = "Post Reply";
    postBtn.style.border = "none";
    postBtn.style.backgroundColor = "#8ecae6";
    postBtn.style.borderRadius = "8px";
    postBtn.style.padding = "6px 14px";
    postBtn.style.marginLeft = "8px";
    postBtn.style.cursor = "pointer";
    postBtn.style.color = "#1d3557";
    postBtn.style.fontWeight = "600";
    postBtn.style.transition = "background-color 0.3s ease";
    postBtn.addEventListener("mouseenter", () => {
        postBtn.style.backgroundColor = "#219ebc";
    });
    postBtn.addEventListener("mouseleave", () => {
        postBtn.style.backgroundColor = "#8ecae6";
    });

    postBtn.addEventListener("click", () => {
        if (nameInput.value.trim() && commentInput.value.trim()) {
            const newReply = {
                name: nameInput.value.trim(),
                comment: commentInput.value.trim(),
                date: new Date().toLocaleString(),
                likes: 0,
                dislikes: 0,
                replies: []
            };
            replyObj.replies.push(newReply);
            saveData();
            wrapper.appendChild(createReplyElement(newReply, threadIndex, replyObj.replies));
            nameInput.value = "";
            commentInput.value = "";
            replyForm.style.display = "none";
        }
    });

    replyForm.style.display = "flex";
    replyForm.style.alignItems = "center";
    replyForm.appendChild(nameInput);
    replyForm.appendChild(commentInput);
    replyForm.appendChild(postBtn);

    replyBtn.addEventListener("click", () => {
        replyForm.style.display = replyForm.style.display === "none" ? "flex" : "none";
    });

    wrapper.appendChild(replyForm);

    replyObj.replies.forEach(r => {
        wrapper.appendChild(createReplyElement(r, threadIndex, replyObj.replies));
    });

    return wrapper;
}

function addReplyForm(title, desc) {
    const form = document.createElement("div");
    form.style.marginTop = "12px";

    const name = document.createElement("input");
    name.placeholder = "Your Name";
    name.style.display = "block";
    name.style.marginBottom = "6px";
    name.style.padding = "10px";
    name.style.width = "250px";
    name.style.border = "1.5px solid #b0bec5";
    name.style.borderRadius = "10px";
    name.style.fontSize = "15px";
    name.style.transition = "border-color 0.3s ease";
    name.addEventListener("focus", () => {
        name.style.borderColor = "#8ecae6";
    });
    name.addEventListener("blur", () => {
        name.style.borderColor = "#b0bec5";
    });

    const comment = document.createElement("textarea");
    comment.placeholder = "Your Comment";
    comment.style.display = "block";
    comment.style.marginBottom = "10px";
    comment.style.padding = "12px";
    comment.style.width = "320px";
    comment.style.height = "80px";
    comment.style.border = "1.5px solid #b0bec5";
    comment.style.borderRadius = "10px";
    comment.style.fontSize = "15px";
    comment.style.transition = "border-color 0.3s ease";
    comment.addEventListener("focus", () => {
        comment.style.borderColor = "#8ecae6";
    });
    comment.addEventListener("blur", () => {
        comment.style.borderColor = "#b0bec5";
    });

    const btn = document.createElement("button");
    btn.textContent = "Submit";
    btn.style.backgroundColor = "#8ecae6";  
    btn.style.border = "none";
    btn.style.padding = "12px 26px";
    btn.style.borderRadius = "12px";
    btn.style.cursor = "pointer";
    btn.style.color = "#1d3557";
    btn.style.fontWeight = "700";
    btn.style.fontSize = "16px";
    btn.style.transition = "background-color 0.3s ease";
    btn.addEventListener("mouseenter", () => {
        btn.style.backgroundColor = "#219ebc";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.backgroundColor = "#8ecae6";
    });

    btn.addEventListener("click", () => {
        if (name.value.trim() && comment.value.trim()) {
            const idx = storedThreads.findIndex(t => t.subject === title && t.content === desc);
            if (idx > -1) {
                const newRes = {
                    name: name.value.trim(),
                    comment: comment.value.trim(),
                    date: new Date().toLocaleString(),
                    likes: 0,
                    dislikes: 0,
                    replies: []
                };
                storedThreads[idx].replies.push(newRes);
                saveData();
                document.getElementById("replyBox").appendChild(
                    createReplyElement(newRes, idx, storedThreads[idx].replies)
                );
            }
            name.value = "";
            comment.value = "";
        } else {
            alert("Please fill both fields");
        }
    });

    form.appendChild(name);
    form.appendChild(comment);
    form.appendChild(btn);

    return form;
}

const header = buildHeader();
const sidebar = buildSidebar();

document.body.style.margin = "0";
document.body.style.backgroundColor = "#e8f1f2"; 
document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
document.body.style.color = "#333";

document.body.appendChild(header);
document.body.appendChild(sidebar);
document.body.appendChild(mainArea);
mainArea.appendChild(buildForm());

storedThreads.forEach(t => {
    addSidebarThread(t.subject, t.content, t.replies || []);
});