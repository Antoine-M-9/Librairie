const ul = document.querySelector('.ul');
const form = document.querySelector('.form')
const editForm = document.querySelector('.ulEdit');
const inputForm = document.querySelectorAll('form input');
const inputEdit = document.querySelectorAll('.ulEdit input');

let bibli = {
    livre: {type: 'Livre', titre: 'Les fossoyeurs', auteur: 'Victor Castanet', tome: '1'},
    Manga: {type: 'Manga', titre: `One Piece 'larmes'`, auteur: 'Eiichiro Oda', tome: '9'},
    BD: {type: 'BD', titre: 'Emotion', auteur: 'Art-mella', tome: '1'}
};


function loadHTML(){
    if(!window.localStorage.getItem('data')) return
    const data = JSON.parse(window.localStorage.getItem('data'));
    bibli = data;
    Object.keys(bibli).map(key => createHTML(bibli[key], key));
}

window.addEventListener('load', loadHTML);
form.addEventListener('submit', createItem);

function newEdit(e) {
    e.preventDefault();
    const key = this.parentNode.parentNode.getAttribute('data-key');
    bibli[key] = {
        type: inputEdit[0].value,
        titre: inputEdit[1].value,
        auteur: inputEdit[2].value,
        tome: inputEdit[3].value,
    }
    saveObj();
}


function createItem(e) {
    e.preventDefault();
    const timestamp = Date.now();
    bibli[timestamp] = {
        type: inputForm[0].value,
        titre: inputForm[1].value,
        auteur: inputForm[2].value,
        tome: inputForm[3].value,

    }
    createHTML(bibli[timestamp], timestamp);
    saveObj();
    this.reset();
}

function createHTML(object, key) {
        if (!object) return
        const html =  
            `
            <span>Type: &nbsp; <b>${object.type}</b></span> <br>
            <span>Titre: &nbsp; <b>${object.titre}</b></span> <br>
            <span>Auteur: &nbsp; <b>${object.auteur}</b></span> <br>
            <span>Tome: &nbsp; <b>${object.tome}</b></span>
            <div class="editTrash" name='t'>
            <button name="modif" class="mod">💱</button>
            <button name="trash" class="trash">🗑️</button>
            </div>
             `
        const li = document.createElement('li');
        li.classList.add('item');
        li.setAttribute('data-key', key)
        li.innerHTML = html;
        ul.insertBefore(li, ul.firstChild);

        
        li.children.t.children.trash.onclick = toBin;   
        li.children.t.children.modif.onclick = modify;
    }

async function toBin(){
    const a = document.querySelector('.item');
    const key = this.parentNode.parentNode.getAttribute('data-key');    
    a.style.backgroundColor = 'blue';
    a.style.transitionProperty = '.1s';
    this.parentNode.parentNode.remove();
    delete bibli[key];
    saveObj();
}

function saveObj(){
    window.localStorage.setItem('data', JSON.stringify(bibli))
}


function modify(e) {
    e.preventDefault();
    const b = document.querySelector('.form');
    const c = document.querySelector('header');
    const d = document.querySelector('.ul');
    const key = this.parentNode.parentNode.getAttribute('data-key');

    bibli[key].edit = !bibli[key].edit;
    if (bibli[key].edit) {
        editForm.style.display = 'flex';
        b.style.filter = 'blur(5px)';
        c.style.filter = 'blur(5px)';
        d.style.filter = 'blur(5px)';
        function maj() {
            bibli[key] = {
                type: inputEdit[0].value,
                titre: inputEdit[1].value,
                auteur: inputEdit[2].value,
                tome: inputEdit[3].value
            }
            saveObj();
        } 
    } else {
        editForm.style.display = 'none';
        b.style.filter = 'none';
        c.style.filter = 'none';
        d.style.filter = 'none';
    }

    editForm.addEventListener('submit', maj);
}
