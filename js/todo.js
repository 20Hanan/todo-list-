let button = document.querySelector("button");
let input = document.querySelector("input");
button.addEventListener("click", function (e) {
  e.preventDefault();
  if (input.value !== "") {
    let ele = document.createElement("div");
    let out = document.createElement("div");
    document.body.appendChild(ele);
    ele.appendChild(out);
    ele.classList.add("obj");
    out.classList.add("outbut_frame");
    let text = document.createTextNode(input.value);
    out.appendChild(text);
    // Retrieve the existing tasks array from sessionStorage
    let existingTasks =
      JSON.parse(window.sessionStorage.getItem("tasks")) || [];

    // Add the new task to the array
    existingTasks.push(input.value);

    // Save the updated array back to sessionStorage
    window.sessionStorage.setItem("tasks", JSON.stringify(existingTasks));
    let innerBtn = document.createElement("button");
    out.appendChild(innerBtn);
    innerBtn.classList.add("delete");
    innerBtn.innerHTML = "delete";
    innerBtn.addEventListener("click", (d) => {
      ele.remove();
      let elementToRemove = text; // Specify the element you want to remove
      let storedTasks =
        JSON.parse(window.sessionStorage.getItem("tasks")) || [];

      // Check if the element exists in the array
      let index = storedTasks.indexOf(elementToRemove.data);

      if (index !== -1) {
        // Remove the element from the array
        storedTasks.splice(index, 1);

        // Update the session storage with the modified array
        window.sessionStorage.setItem("tasks", JSON.stringify(storedTasks));

        console.log("Element removed:", elementToRemove);
      } else {
        console.log("Element not found:", elementToRemove);
      }
    });
    ele.addEventListener("click", (e) => {
      e.target.classList.toggle("checked");
    });
    input.blur();
    input.value = "";
    let getSessionLength = sessionStorage.length;
    console.log(getSessionLength);
    window.addEventListener("beforeunload", (e) => {
      if (sessionStorage.length !== 0) {
        sessionStorage.clear();
      }
    });
  }
});
