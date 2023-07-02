document.addEventListener("DOMContentLoaded", function() {
    var saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", saveToThings3);
  
    // Automatically populate task name and note with current page data
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var activeTab = tabs[0];
      var taskNameInput = document.getElementById("taskNameInput");
      var noteInput = document.getElementById("noteInput");
  
      taskNameInput.value = activeTab.title;
      noteInput.value = activeTab.url;
    });
  
    // Load project and tag suggestions from settings
    chrome.storage.sync.get(["projects", "tags"], function(data) {
      var projectInput = document.getElementById("projectInput");
      var tagsInput = document.getElementById("tagsInput");
      var selectedTagsContainer = document.getElementById("selectedTags");
  
      var projects = data.projects || [];
      var tags = data.tags || [];
  
      projectInput.setAttribute("data-suggestions", projects.join(","));
      tagsInput.setAttribute("data-suggestions", tags.join(","));
  
      tagsInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          var tag = tagsInput.value.trim();
          if (tag !== "") {
            var tagElement = document.createElement("span");
            tagElement.classList.add("tag");
            tagElement.textContent = tag;
            selectedTagsContainer.appendChild(tagElement);
            tagsInput.value = "";
          }
        }
      });
  
      selectedTagsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("tag")) {
          event.target.remove();
        }
      });
    });
  });
  
  function saveToThings3() {
    var taskNameInput = document.getElementById("taskNameInput");
    var noteInput = document.getElementById("noteInput");
    var projectInput = document.getElementById("projectInput");
    var tagsInput = document.getElementById("tagsInput");
  
    var taskName = taskNameInput.value;
    var note = noteInput.value;
    var project = projectInput.value;
    var tags = Array.from(document.querySelectorAll(".tag")).map(tagElement => tagElement.textContent.trim());
  
    // Generate the URL using the task name, note, project, and tags
    var url = "things3://add?title=" + encodeURIComponent(taskName) +
              "&notes=" + encodeURIComponent(note) +
              "&project=" + encodeURIComponent(project) +
              "&tags=" + encodeURIComponent(tags.join(","));
  
    // Open Things3 app with the generated URL
    chrome.tabs.create({ url: url });
  }
  