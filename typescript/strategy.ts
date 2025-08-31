/* ----------- interfaces ------------*/

interface StrategyOperations {

    createFileUploadElements: () => undefined;

    readUpload: (file: File) => undefined;

    confirmSelectedStrategy: () => undefined;

}

/* ----------- implementations ------------ */

class Strategy implements StrategyOperations {

    createFileUploadElements(): undefined {
        const setupContainer: HTMLElement | null = document.getElementById("setupContainer");
        setupContainer!.replaceChildren()

        setupContainer!.appendChild(this.createHeader())
        setupContainer!.appendChild(this.createUploadArea())
        
    }

    createHeader(): HTMLElement {

        const parentDiv: HTMLElement = document.createElement("div")
        parentDiv.id = "uploadHeader";
        
        const marketTitle: HTMLElement = document.createElement("h3");
        marketTitle.innerHTML = "Strategy File Upload";
        marketTitle.classList.add("strategyTitle")
        parentDiv.appendChild(marketTitle)

        const description: HTMLElement = document.createElement("p")
        description.innerHTML = "Upload a single file containing all indicators and the overall strategy code, for reference on how to layout your file see the documentation"
        description.classList.add("strategyDescription")
        parentDiv.appendChild(description)

        return parentDiv
    }

    createUploadArea(): HTMLElement {
        const parentDiv: HTMLElement = document.createElement("div")

        const inputDiv: HTMLElement = document.createElement("div")
        inputDiv.id = "strategyContainer"

        const inputLabel: HTMLElement = document.createElement("label")
        inputLabel.innerHTML = "Strategy File Upload"
        inputLabel.setAttribute("for", "upload")
        inputLabel.classList.add("uploadLabel")
        inputDiv.appendChild(inputLabel)

        const input: HTMLElement = document.createElement("input")
        input.setAttribute("type", "file")
        input.setAttribute("name", "upload")
        input.id = "strategyUpload"
        input.classList.add("upload")
        inputDiv.appendChild(input)

        parentDiv.appendChild(inputDiv)

        const submitButton: HTMLElement = document.createElement("button")
        submitButton.innerHTML = "Confirm Strategy"
        submitButton.onclick = this.confirmSelectedStrategy.bind(this)
        parentDiv.appendChild(submitButton)

        return parentDiv
    }

    readUpload(file: File): undefined {
        let reader: FileReader = new FileReader()
        let scriptElement: HTMLScriptElement | null = document.getElementById("userStrategy") as HTMLScriptElement

        if(!scriptElement) {
            scriptElement = document.createElement("script");
            scriptElement.id = "userStrategy"
        } else {
            scriptElement.innerHTML = ""
        }

        reader.readAsText(file, "UTF-8")

        reader.onload = (data) => {
            scriptElement.innerHTML = (data.target!.result)!.toString()
        }

        scriptElement.type = "text/javascript"

        document.body.appendChild(scriptElement)

        
    }

    confirmSelectedStrategy(): undefined {
        let uploadInput: HTMLInputElement | null = (document.getElementById("strategyUpload")) as HTMLInputElement
        let uploadedFiles: FileList | null = uploadInput!.files
        let strategy: any;

        if (uploadedFiles) {
            strategy = uploadedFiles[0]
        }

        this.readUpload(strategy)

    }

}

/* ------------- State Check ------------- */