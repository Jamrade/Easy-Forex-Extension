"use strict";
/* ----------- interfaces ------------*/
/* ----------- implementations ------------ */
class Strategy {
    createFileUploadElements() {
        const setupContainer = document.getElementById("setupContainer");
        setupContainer.replaceChildren();
        setupContainer.appendChild(this.createHeader());
        setupContainer.appendChild(this.createUploadArea());
    }
    createHeader() {
        const parentDiv = document.createElement("div");
        parentDiv.id = "uploadHeader";
        const marketTitle = document.createElement("h3");
        marketTitle.innerHTML = "Strategy File Upload";
        marketTitle.classList.add("strategyTitle");
        parentDiv.appendChild(marketTitle);
        const description = document.createElement("p");
        description.innerHTML = "Upload a single file containing all indicators and the overall strategy code, for reference on how to layout your file see the documentation";
        description.classList.add("strategyDescription");
        parentDiv.appendChild(description);
        return parentDiv;
    }
    createUploadArea() {
        const parentDiv = document.createElement("div");
        const inputDiv = document.createElement("div");
        inputDiv.id = "strategyContainer";
        const inputLabel = document.createElement("label");
        inputLabel.innerHTML = "Strategy File Upload";
        inputLabel.setAttribute("for", "upload");
        inputLabel.classList.add("uploadLabel");
        inputDiv.appendChild(inputLabel);
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("name", "upload");
        input.id = "strategyUpload";
        input.classList.add("upload");
        inputDiv.appendChild(input);
        parentDiv.appendChild(inputDiv);
        const submitButton = document.createElement("button");
        submitButton.innerHTML = "Confirm Strategy";
        submitButton.onclick = this.confirmSelectedStrategy.bind(this);
        parentDiv.appendChild(submitButton);
        return parentDiv;
    }
    readUpload() {
        return "";
    }
    confirmSelectedStrategy() {
        let uploadInput = (document.getElementById("strategyUpload"));
        let uploadedFiles = uploadInput.files;
        let strategy;
        if (uploadedFiles) {
            strategy = uploadedFiles[0];
        }
        const scriptElement = document.createElement("script");
        let reader = new FileReader();
        reader.readAsText(strategy, "UTF-8");
        reader.onload = (evt) => {
            scriptElement.innerHTML = (evt.target.result).toString();
        };
        scriptElement.type = "text/javascript";
        document.body.appendChild(scriptElement);
        // let script: HTMLElement = document.createElement('script');
        // var reader = new FileReader();
        // reader.readAsText(myUploadedFile, "UTF-8");
        // reader.onload = function(evt) {
        //     script.innerHTML = evt.target.result;
        // };
        // script.type = "text/javascript";
        // console.log("running the script: " + myUploadedFile.name);
        // document.body.appendChild(script);
    }
    initializeSelectedStrategy() {
    }
    initializeMarketConnection() {
    }
}
/* ------------- State Check ------------- */ 
//# sourceMappingURL=strategy.js.map