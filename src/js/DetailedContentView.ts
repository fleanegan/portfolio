import PDF from '../../assets/maschinenbau/Diplomarbeit.pdf';

export class DetailedContentView {
    createBlurryOverlay() {
        let blur = document.createElement("div");
        blur.setAttribute("class", "blur");
        blur.setAttribute("id", "modalBlur");
        document.body.appendChild(blur);
        blur.addEventListener("click", () => {
            this.hide();
        });
    }

    createBox() {
        let modalCloseButton = document.getElementById("modalCloseButton");
        modalCloseButton.addEventListener("click", () => {
            this.hide();
        });
    }

    private isHiddenFlag: boolean;

    constructor() {
        this.createBlurryOverlay();
        this.createBox();
        this.show();
    }

    isHidden(): boolean{
        return this.isHiddenFlag;
    }

    hide() {
        const modalBox = document.getElementById("modalBox");
        const modalBlur = document.getElementById("modalBlur");
        modalBox.style.visibility = "hidden";
        modalBlur.style.visibility = "hidden";
        this.isHiddenFlag = true;
    }

    show() {
        const modalBox = document.getElementById("modalBox");
        const modalBlur = document.getElementById("modalBlur");
        modalBox.style.visibility = "visible";
        modalBlur.style.visibility = "visible";
        this.isHiddenFlag = false;
    }

    setContent(rawHTML: string) {
        const modalBox = document.getElementById("modalBox");
        let oldContent = document.getElementById("modalInnerHtml");
        if (oldContent)
            oldContent.remove();
        let contentHolder = document.createElement("div");
        contentHolder.setAttribute("class", "modalContent");
        contentHolder.setAttribute("id", "modalInnerHtml");
        modalBox.appendChild(contentHolder);
        contentHolder.innerHTML = rawHTML;
        const link = document.getElementById('pdfLink') as HTMLAnchorElement | null;
        if (link !== null)
            link.href = PDF;
    }
}
