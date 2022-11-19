import {Scaler} from "./utils";

export class DetailedContentView {
    createBlurryOverlay() {
        let blur = document.createElement("div");
        blur.setAttribute("class", "blur");
        blur.setAttribute("style",
            "position: fixed;" +
            "top: 0;" +
            "bottom: 0;" +
            "left: 0;" +
            "right: 0;" +
            "width: 100%;" +
            "height: 100%;" +
            "background: rgba(0, 0, 0, 0.5);" +
            "backdrop-filter: blur(3px);" +
            "z-index: 1;");
        document.body.appendChild(blur);
        blur.addEventListener("click", () => {
            this.hide();
        });
        this.elements.push(blur);
    }

    createBox() {
        let modalBox = document.createElement("div");
        modalBox.setAttribute("id", "ModalBox");
        modalBox.setAttribute("class", "modal");
        modalBox.setAttribute("style", "display: flex;" +
            "    flex-direction: column;" +
            "    background-color: #fdfffc;" +
            "    justify-content: right;" +
            "    gap: 0.4rem;" +
            // "    min-width: 650px;" +
            "    max-width: 80%;" +
            "    max-height: 80%;" +
            "    padding: 1.3rem;" +
            "    min-height: 80%;" +
            "    overflow-y: auto;" +
            "    position: absolute;" +
            "    top: 10%;" +
            "box-shadow: 0px 0px 10px 2px rgba(255,255,255,0.39);" +
            "    z-index: 2;" +
            // "    border-radius: 15px;" +
            "    border: 1px solid #ddd;"
        );
        let newcloseButton = document.createElement("button");
        let newContent = document.createTextNode("X");
        newcloseButton.appendChild(newContent);
        newcloseButton.id = "btn";
        newcloseButton.setAttribute("style",
            "position: fixed;" +
            " z-index: 6;" +
            "    border-radius: 64px;" +
            "border :1px solid;" +
            "background-color  : #d62828;" +
            "    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);" +
            " min-height: 64px;" +
            " min-width:  64px;" +
            " max-width:  64px;" +
            " max-width:  64px;" +
            " float: right;" +
            " margin: 0px;" +
            " padding:0px;" +
            " clear: both;" +
            " float:right;" +
            "font-size:4ref;");
        modalBox.appendChild(newcloseButton);
        newcloseButton.addEventListener("click", () => {
            this.hide();
        });
        if (Scaler.getWidth() <= 650) {
            modalBox.style.minWidth = "100%";
        }
        document.body.appendChild(modalBox);
        modalBox.parentElement.style.display = "flex";
        modalBox.parentElement.style.justifyContent = "center";
        this.elements.push(modalBox);
    }

    private elements: HTMLElement[] = [];
    private isHiddenFlag: boolean;

    constructor() {
        this.createBlurryOverlay();
        this.createBox();
        this.hide();
    }

    isHidden(): boolean{
        return this.isHiddenFlag;
    }

    hide() {
        this.elements.forEach((element) => {
            element.style.display = "none";
        });
        this.isHiddenFlag = true;
    }

    show() {
        this.elements.forEach((element) => {
            element.style.display = "block";
        });
        this.isHiddenFlag = false;
    }

    setContent(rawHTML: string) {
        const modalBox = document.getElementById("ModalBox");
        let oldContent = document.getElementById("modalInnerHtml");
        if (oldContent)
            oldContent.remove();
        let contentHolder = document.createElement("content");
        contentHolder.setAttribute("class", "modalContent");
        contentHolder.setAttribute("id", "modalInnerHtml");
        if (!modalBox)
            throw new Error("could not find DOM");
        modalBox.appendChild(contentHolder);
        contentHolder.insertAdjacentHTML(
            'beforeend',
            rawHTML
        );
    }
}