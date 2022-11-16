export class DetailedContentView {
    createBlurryOverlay(){
        let div = document.createElement("DIV");
        div.setAttribute("style", "position: fixed;" +
            "top: 0;" +
            "bottom: 0;" +
            "left: 0;" +
            "right: 0;" +
            "width: 100%;" +
            "height: 100%;" +
            "background: rgba(0, 0, 0, 0.5);" +
            "backdrop-filter: blur(3px);" +
            "z-index: 1;");
        document.body.appendChild(div);
        div.addEventListener("click", () =>{
            this.hide();
        });
        this.elements.push(div);
    }

    createBox(){
        let div = document.createElement("DIV");
        div.setAttribute("style", "display: flex;" +
            "    flex-direction: column;" +
            "    justify-content: center;" +
            "    gap: 0.4rem;" +
            "    min-width: 650px;" +
            "    max-width: 80%;" +
            "    padding: 1.3rem;" +
            "    min-height: 80%;" +
            "    position: absolute;" +
            "    top: 10%;" +
            "    background-color: white;" +
            "    z-index: 2;" +
            // "    border-radius: 15px;" +
        "    border: 1px solid #ddd;"
        );
        if (window.innerWidth <= 650){
            div.style.minWidth = "100%";
            console.log("wuhi\n\n\n\n")
        }

        document.body.appendChild(div);
        div.parentElement.style.display = "flex";
        div.parentElement.style.justifyContent = "center";
        this.elements.push(div);
    }

    private elements: HTMLElement[] = [];

    constructor() {
        function createModalpopup () {
            var newDiv = document.createElement("DIV");
            newDiv.id="div"
            var textContent = document.createTextNode("Hi! I am a modal popup created by pure javascript");
            newDiv.appendChild(textContent);
            var newcloseButton= document.createElement("button");
            var newContent = document.createTextNode("X");
            newcloseButton.appendChild(newContent);
            newcloseButton.id="btn";
            // newDiv.setAttribute("style", "position: absolute; z-index:5; border:3px solid;height: 150px; width: 380px; top: 741px; left: 491px; padding:10px; margin: 50px;background:red; text-align: center;vertical-align: middle;line-height: 140px;");
            newDiv.setAttribute("style", "position: fixed;" +
                "top: 0;" +
                "bottom: 0;" +
                "left: 0;" +
                "right: 0;" +
                "width: 100%;" +
                "height: 100%;" +
                "background: rgba(0, 0, 0, 0.5);" +
                "backdrop-filter: blur(3px);" +
                "z-index: 1;");
            newcloseButton.setAttribute("style", "border :1px solid; height: 15px; width:20px; top: 6px; left: 4px; float: right; margin: 0px; padding:0px; clear: both; float:right;font-size:11px;");

            newDiv.appendChild(newcloseButton);
            document.body.appendChild(newDiv).appendChild(newcloseButton);

            newcloseButton.onclick = function remove(btn)
            {
                newDiv.parentElement.removeChild(newDiv);
            }
            newDiv.style.zIndex = '5';
            document.body.appendChild(newDiv);
            console.log("modal created");
        }

        this.createBlurryOverlay();
        this.createBox();
        // createModalpopup();
    }

    hide() {
        this.elements.forEach((element) =>{
            element.style.display = "none";
        })
    }

    show() {
        this.elements.forEach((element) =>{
            element.style.display = "block";
        })
    }
}