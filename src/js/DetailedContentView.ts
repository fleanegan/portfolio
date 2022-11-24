import PDF from '../../assets/maschinenbau/Diplomarbeit.pdf';

export class DetailedContentView {
    createBlurryOverlay() {
        let blur = document.createElement("div");
        blur.setAttribute("class", "blur");
        document.body.appendChild(blur);
        blur.addEventListener("click", () => {
            this.hide();
        });
        this.elements.push(blur);
    }

    createBox() {
        let modalBox = document.createElement("div");
        modalBox.setAttribute("id", "ModalBox");
        modalBox.setAttribute("class", "modalBox");
        let newcloseButton = document.createElement("button");
        let newContent = document.createTextNode("X");
        newcloseButton.appendChild(newContent);
        newcloseButton.id = "btn";
        newcloseButton.setAttribute("class", "modalCloseButton");
        modalBox.appendChild(newcloseButton);
        newcloseButton.addEventListener("click", () => {
            this.hide();
        });
        document.body.appendChild(modalBox);
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
            element.style.visibility = "hidden";
        });
        this.isHiddenFlag = true;
    }

    show() {
        this.elements.forEach((element) => {
            element.style.visibility = "visible";
        });
        this.isHiddenFlag = false;
    }

    setContent(rawHTML: string) {
        const modalBox = document.getElementById("ModalBox");
        let oldContent = document.getElementById("modalInnerHtml");
        if (oldContent)
            oldContent.remove();
        let contentHolder = document.createElement("div");
        contentHolder.setAttribute("class", "modalContent");
        contentHolder.setAttribute("id", "modalInnerHtml");
        if (!modalBox)
            throw new Error("could not find DOM");
        modalBox.appendChild(contentHolder);
        contentHolder.insertAdjacentHTML(
            'beforeend',
            rawHTML
        );
        const link = document.getElementById('pdfLink') as HTMLAnchorElement | null;
        if (link !== null)
            link.href = PDF;
        else console.log("could not find link");
    }
}
