

class DigitalText {
    #config ;
    #textContainerMainSelector ; // selector got from user
    #contentContainerSelector ; //page content selector
    #fonts = 
        {
        "404": [ ],
        "A": [ 16, 12, 8, 4, 1, 2, 7, 11, 19, 15, 10,9],
        "B": [ 0, 4, 8, 12, 16, 17, 18, 15, 10, 9, 7, 2,1],
        "C": [ 3, 2, 1, 4, 8, 12, 17, 18,19],
        "D": [ 0, 4, 8, 12, 16, 17, 18, 15, 11, 7, 2,1],
        "E": [ 0, 1, 2, 3, 4, 8, 12, 16, 17, 18, 19, 9,10],
        "F": [ 4, 8, 16, 12, 1, 2, 3, 9, 10,0],
        "G": [ 3, 2, 1, 4, 8, 12, 17, 18, 15, 11,10],
        "H": [ 0, 4, 8, 12, 16, 19, 15, 11, 9, 10, 7,3],
        "I": [ 1, 0, 2, 5, 9, 13, 17, 18,16],
        "J": [ 1, 2, 3, 6, 10, 17, 14, 12,0],
        "K": [ 0, 4, 8, 12, 16, 3, 9, 6, 14,19],
        "L": [ 0, 4, 8, 12, 18, 19, 17,16],
        "M": [ 16, 12, 8, 4, 0, 5, 6, 3, 7, 11, 15,19],
        "N": [ 0, 4, 8, 12, 16, 5, 15, 10, 19, 11, 7,3],
        "O": [ 1, 2, 7, 11, 15, 18, 17, 12, 8,4],
        "P": [ 0, 4, 12, 16, 8, 1, 2, 7, 11, 10,9],
        "Q": [ 1, 2, 7, 11, 15, 14, 18, 19, 17, 12, 8,4],
        "R": [ 0, 4, 8, 12, 16, 1, 2, 7, 10, 9, 14, 19 ],
        "S": [ 3, 2, 1, 4, 8, 9, 10, 15, 18, 17,16],
        "T": [ 0, 1, 2, 3, 5, 9, 13,17],
        "U": [ 0, 4, 8, 12, 17, 18, 15, 11, 7,3],
        "V": [ 0, 4, 14, 7, 3, 9, 11,15],
        "W":[0,4,8,17,15,11,7,3,12,13,19,14,10],
        "X": [ 0, 5, 10, 15, 3, 6, 9, 12, 16,19],
        "Y": [ 0, 5, 10, 7, 13, 16,3],
        "Z": [ 0, 1, 2, 3, 6, 9, 12, 17, 18, 19],
        " ": [ ]
    };
    #currentText = 'HELLO WELCOME';
    #currentPage = 'home';
    init(config={count:1, selector: 'pageContainer'}){
        this.#config = config;
        this.#textContainerMainSelector = document.querySelectorAll(config.selector)[0]
        this.#textContainerMainSelector.innerHTML = '';
        this.addHeaderButtons();
        
        const textContainerMain = document.createElement('div');
        textContainerMain.classList.add('textContainerMain');
        this.#contentContainerSelector = textContainerMain;
        
        const footer = document.createElement('footer');
        footer.innerHTML = '2024&copy: Addev'

        this.page_home();
        this.#textContainerMainSelector.appendChild(textContainerMain);
        this.#textContainerMainSelector.appendChild(footer);
        this.setGlobalCss();
    }
    addHeaderButtons(){
        const dtButtonsContainer = document.createElement('div');
        dtButtonsContainer.classList.add('dtButtonsContainer');

        const animateButton = document.createElement('button');
        const addTextButton = document.createElement('button');
        const createFontButton = document.createElement('button');

        animateButton.innerText = "Home";
        addTextButton.innerText = "Change Text";
        createFontButton.innerText = "Fonts/Letters"

        createFontButton.addEventListener('click', ()=>{
            if(this.#currentPage !== 'createFont')this.page_createFont();
        })
        addTextButton.addEventListener('click', ()=>{
            if(this.#currentPage !== 'addText')this.page_addText();
        })
        animateButton.addEventListener('click', ()=>{
            if(this.#currentPage !== 'home')this.page_home();
        })
        
        dtButtonsContainer.appendChild(animateButton);
        dtButtonsContainer.appendChild(addTextButton);
        dtButtonsContainer.appendChild(createFontButton);

        this.#textContainerMainSelector.appendChild(dtButtonsContainer);
    }


    page_addText(){
        this.#currentPage = 'addText';
        this.#contentContainerSelector.innerHTML = '';
        const container = document.createElement('div');
        const button = document.createElement('button');
        button.setAttribute('disabled','true');
        container.classList.add('inputContainer');
        const input = document.createElement('input');
        const p = document.createElement('p');
        p.style.color = 'red';
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Enter text...');
        button.innerHTML = 'Save';

        input.addEventListener('keyup', ()=>{
            input.value = input.value.toUpperCase();
            if(input.value.length > this.#config.count){
                button.setAttribute('disabled','true');
                p.innerText = "Input must be maximum length of "+this.#config.count;
            }else if(input.value.length <= 0){
                button.setAttribute('disabled','true');
                p.innerText = "Input must have a text";
            }else{
                button.removeAttribute('disabled');
                p.innerText = "";
            }
        })
        
        const currentTextContainer = document.createElement('div');
        currentTextContainer.classList.add('dtcurrentTextContainer');
        currentTextContainer.style.display = 'none';
        const dtTitle = document.createElement('h1');
        const textContent = document.createElement('p');
        dtTitle.classList.add('dtTitle');
        if(this.#currentText){
            dtTitle.innerText = this.#currentText;
            textContent.innerText = 'Current text';
            currentTextContainer.style.display = 'block';
        }
        currentTextContainer.appendChild(dtTitle);
        currentTextContainer.appendChild(textContent);
        
        container.appendChild(input);
        container.appendChild(button);
        container.appendChild(p);
        container.appendChild(currentTextContainer);
        this.#contentContainerSelector.appendChild(container);

        button.addEventListener("click",()=>{
            this.#currentText = input.value;
        if(this.#currentText){
            dtTitle.innerText = this.#currentText;
            textContent.innerText = 'Current text';
            currentTextContainer.style.display = 'block';
        }
        })

    }


    page_createFont(){
        this.#currentPage = 'createFont';
        this.#contentContainerSelector.innerHTML = '';
        const container = document.createElement('div');
        const button = document.createElement('button');
        button.setAttribute('disabled','true');
        container.classList.add('inputContainer');
        const input = document.createElement('input');
        const p = document.createElement('p');
        p.style.color = 'red';
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Enter Letter...');
        button.innerHTML = 'Save';

        input.addEventListener('keyup', ()=>{
            input.value = input.value.toUpperCase();
            if(input.value.length > 1 && !Object.keys(this.#fonts).includes(input.value)){
                button.setAttribute('disabled','true');
                p.innerText = "Enter single letter only";
            }else if(input.value.length <= 0){
                button.setAttribute('disabled','true');
                p.innerText = "Enter a letter at most";
            }else{
                button.removeAttribute('disabled');
                p.innerText = "";
            }
        })

        let selectedDots = [];
        const digitalTextContainer = document.createElement('div');
        digitalTextContainer.classList.add('digitalTextContainer');
        for (let ci = 0; ci < (4*5); ci++) {
            const textPoints = document.createElement('div');
            textPoints.classList.add('textPoints', 'textPoints-hover');
            input.addEventListener('change', ()=>{
                selectedDots = [];
                textPoints.classList.remove('textPoints-active');
            })
            textPoints.addEventListener('click', () =>{
                if(textPoints.classList.contains('textPoints-active')){
                    selectedDots = selectedDots.filter((v)=>v!==ci);
                    textPoints.classList.remove('textPoints-active');
                }else{
                    textPoints.classList.add('textPoints-active');
                    selectedDots.push(ci);
                }
            })
            digitalTextContainer.appendChild(textPoints);
        }
        
        
        const listContainer = document.createElement('div');
        listContainer.classList.add('dtfontListContainer');
        const dtTitle = document.createElement('h1');
        dtTitle.classList.add('dtTitle');

        dtTitle.innerText = 'Font list';
        listContainer.appendChild(dtTitle);
        listContainer.appendChild(this.getFontListHtml());
        
        button.addEventListener('click', ()=>{
            this.#fonts[input.value] = selectedDots;
            dtTitle.innerText = 'Font list';
            listContainer.innerHTML = ''
            listContainer.appendChild(dtTitle);
            listContainer.appendChild(this.getFontListHtml());
        })
        

        container.appendChild(input);
        container.appendChild(p);
        container.appendChild(digitalTextContainer);
        container.appendChild(button);
        container.appendChild(listContainer);

        this.#contentContainerSelector.appendChild(container);



    }


    page_home(){
        this.#currentPage = 'home';
        this.#contentContainerSelector.innerHTML = '<p style="color:white; text-align:center; width:100%;">LOADING...</p>';
        let animatedCount = 0
        
        const timer = setInterval(() => {
            if(this.#currentPage!== 'home' || animatedCount>=(this.#currentText.length*4)){
                clearInterval(timer);
                return;
            }
            this.#contentContainerSelector.innerHTML = '';
            for (let i = 0; i < this.#config.count; i++) {
                this.#contentContainerSelector.appendChild(this.#createDigitalText(this.#fonts[this.#currentText[(animatedCount+i)-this.#currentText.length<=this.#currentText.length*2?(animatedCount+i)-this.#currentText.length:i]]??this.#fonts[404]));
            }
            animatedCount++;
        }, 500);
    }

    #createDigitalText(selectedDots){
        const digitalTextContainer = document.createElement('div');
        digitalTextContainer.classList.add('digitalTextContainer');
        for (let ci = 0; ci < (4*5); ci++) {
            const textPoints = document.createElement('div');
            if(selectedDots.includes(ci))textPoints.classList.add('textPoints', 'textPoints-active');
            else textPoints.classList.add('textPoints');
            
            digitalTextContainer.appendChild(textPoints);
        }
        return digitalTextContainer;
    }

    getFontListHtml(){

        const listData = document.createElement('div');
        listData.classList.add('dtlistData');
        Object.keys(this.#fonts).forEach((letter)=>{
            const listDataRow = document.createElement('div');
            listDataRow.classList.add('dtlistDataRow');
            const listDataLetter = document.createElement('div');
            listDataLetter.classList.add('dtlistDataLetter');
            listDataLetter.innerText = letter;
            listDataRow.appendChild(listDataLetter);
            listDataRow.appendChild(this.#createDigitalText(this.#fonts[letter]??this.#fonts[404]));
            listData.appendChild(listDataRow);
        })
        return listData;
    }

    setGlobalCss(){
        const css = document.createElement('style');
        document.body.appendChild(css);
        css.innerHTML = `
        body{
            background-color: #2e2e2e;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        }
        .pageContainer{
            display: flex;
            flex-direction: column;
        }
        .digitalTextContainer{
            background-color: #101010;
            height: 100px;
            width: 80px;
            border-radius: 10px;
            display: grid;
            grid-template-columns: repeat(4, 1fr); /* 4 columns */
            grid-template-rows: repeat(4, 1fr); /* 4 rows */
            padding: 10px;
            gap: 5px;
        }
        .textPoints{
            background-color: #2e2e2e;
            width: 15px;
            height: 15px;
            border-radius: 3px;
        }
        .textPoints-active{
            background-color: whitesmoke;
        }
        .textPoints-hover:hover{
            background-color: whitesmoke;
            cursor: pointer;
        }
        .textContainerMain{
            display: flex;
            gap: 6px;
        }

        .textContainerMain .inputContainer {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-height: 500px;
            width: 100%;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        .textContainerMain .inputContainer input{
            background-color: #515151;
            color: white;
            border: 0;
            padding: 8px 10px;
            border-radius: 7px;
            outline: 3px white solid;
            min-width: 200px;
        }
        .dtButtonsContainer{
            display: flex;
            gap: 10px;
            padding: 10px 0;
        }
        .dtButtonsContainer button, .inputContainer button{
            background-color: #515151;
            color: white;
            border: 0;
            padding: 8px 10px;
            border-radius: 7px;
            cursor: pointer;
        }
        .dtButtonsContainer button:hover, .inputContainer button:hover{
            background-color: #5f5f5f;
        }
        .dtButtonsContainer button:disabled, .inputContainer button:disabled{
            background-color: #515151;
            opacity: 0.6;
            cursor: not-allowed;
        }
        .dtfontListContainer{
            display: flex;
            flex-direction: column;
            max-width: 500px ;
            width: 100% ;
            border-top: 1px solid white;
            margin-top: 20px;
        }
        .dtlistData{
            display: flex;
            flex-direction: column;
            max-width: 500px ;
            width: 100% ;
            justify-content: center;
        }
        .dtlistData .dtlistDataRow{
            display: flex;
            width: 300px;
            align-items: center;
            justify-content: flex-end;
            gap: 20px;
            padding: 10px;
        }
        .dtlistData .dtlistDataRow .dtlistDataLetter{
            font-size: 50px;
            color: aliceblue;
        }
        .dtTitle{
            color: rgb(159, 159, 159);
        }
        .dtcurrentTextContainer{
            background-color: #5f5f5f;
            padding: 10px;
            border-radius: 15px;
        }
        footer{
            margin-top: auto;
            font-size:10px;
            color:gray
        }
        `;

    }
}