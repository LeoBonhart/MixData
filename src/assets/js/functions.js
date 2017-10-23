let bufferUndo = new Array();
let bufferForward = new Array();
$(() => {
    $('.main-module__button_uppercase').on('click', toUpperCase);
    $('.main-module__button_lowercase').on('click', toLowerCase);
    $('.main-module__button_capitalize').on('click', capitalize);
    $('.main-module__button_trim').on('click', trim);
    $('.main-module__button_paragraph').on('click', paragraph);
    $('.main-module__button_add-plus').on('click', addPlus);
    $('.main-module__button_remove-plus').on('click', removePlus);
    $('.main-module__button_row-quotes').on('click', rowQuotes);
    $('.main-module__button_row-brackets').on('click', rowBrackets);
    $('.main-module__button_before-dash').on('click', beforeDash);
    $('.main-module__button_before-dash-row-brackets').on('click', beforeDashRowBrackets);
    $('.main-module__button_before-dash-row-quotes').on('click', beforeDashRowQuotes);
    $('.main-module__button_remove-after-dash').on('click', removeAfterDash);
    $('.main-module__button_remove-tab').on('click', removeTab);
    $('.main-module__button_transform-space').on('click', transformSpace);
    $('.main-module__button_remove-spec-chars').on('click', removeSpecChars);
    $('.main-module__button_transform-spec-chars-to-space').on('click', transformSpecCharsToSpace);
    $('.main-module__button_search').on('click', search);
    $('.main-module__button_remove-dup').on('click', removeDup);

    $('.main-module__button_sort').on('click', sort);
    $('.main-module__button_reverce-sort').on('click', reverceSort);

    $('.main-module__button_undo').on('click', undo);
    $('.main-module__button_forward').on('click', forward);
    $('.main-module__button_eraser').on('click', eraser);
    $('.main-module__button_clipboard').zclip({
        path: 'dist/lib/js/ZeroClipboard.swf',
        copy: function () { return $('.main-module__textarea').val(); },
        afterCopy: function () { alert('Текст скопирован в буфер обмена!');}
    });
    
});

function getArrayRowsTextArea() {
    let arrayOfLines = $('.main-module__textarea').val().split('\n');
    return arrayOfLines;
}
function setTextAreaByArray(list) {
    let text = '';
    for (let i of list) {
        text += i + '\n';
    }
    $('.main-module__textarea').val(text);
    
}
function checkNavigButton() {
    bufferUndo = bufferUndo.slice(0, 10);
    bufferForward = bufferForward.slice(0, 10);
    if (bufferUndo[0]) {
        $('.main-module__button_undo').removeAttr('disabled')
    } else {
        $('.main-module__button_undo').attr('disabled', 'disabled')
    }
    if (bufferForward[0]) {
        $('.main-module__button_forward').removeAttr('disabled')
    } else {
        $('.main-module__button_forward').attr('disabled', 'disabled')
    }
}
function saveChanges(list) {
    bufferUndo.unshift(list);
    bufferForward = new Array(10);    
    checkNavigButton();   
}
function toUpperCase() {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    for (let row of tempList) {
        list.push(row.toUpperCase())
    }
    setTextAreaByArray(list);    
}
function toLowerCase() {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    for (let row of tempList) {
        list.push(row.toLowerCase())
    }
    setTextAreaByArray(list);
}
function trim() {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    for (let row of tempList) {
        list.push(row.trim().replace(/\s+/g, ' '));
    }
    setTextAreaByArray(list);
}
function capitalize() {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    for (let row of tempList) {
        row = row.toLowerCase();
        list.push(  row
                    .split(' ')
                    .map(el => {
                        return el.charAt(0).toUpperCase() + el.slice(1);
                    })
                    .join(' '))
    }    
    setTextAreaByArray(list);
}
function paragraph() {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    for (let row of tempList) {
        row = row.toLowerCase();
        let firstLetter = '';
        let i = 0;
        for (i = 0, len = row.length; i < len; i++) {
            if (/\S/.test(row.charAt(i))) {
                firstLetter += row.charAt(i).toUpperCase();
                i++;
                break;
            } else {
                firstLetter += row.charAt(i);
            };
        }; 
        list.push(firstLetter + row.slice(i))
    }
    setTextAreaByArray(list);
}
function addPlus() {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    for (let row of tempList) {
        list.push(row
            .split(' ')
            .map(el => {
                if (/\S/.test(el)) {
                    return '+' + el;
                } else {
                    return el;
                }
            })
            .join(' '))
    }
    setTextAreaByArray(list);
}
function removePlus() {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    for (let row of tempList) {
        list.push(row
            .split(' ')
            .map(el => {
                if (/\+/.test(el.charAt(0))) {
                    return el.slice(1);
                } else {
                    return el;
                }
            })
            .join(' '))
    }
    setTextAreaByArray(list);
}
function rowQuotes() {
    helperRowInnerOuterChar('"', '"');
}
function rowBrackets() {
    helperRowInnerOuterChar('[', ']');
}
function beforeDash() {
    helperRowInnerOuterChar('-', '');
}
function beforeDashRowBrackets() { 
    helperRowInnerOuterChar('-[', ']');
}
function beforeDashRowQuotes() {
    helperRowInnerOuterChar('-"', '"');
}
function removeAfterDash() {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    for (let row of tempList) {
        let indDash = row.indexOf(' -');
        if (indDash > -1) {
            list.push(row.substring(0, indDash));
        } else {
            list.push(row);
        }
    }
    setTextAreaByArray(list);    
}
function removeTab() {
    helperReplaceRegularToChar(/\t+/g, '');
}
function transformSpace() {    
    helperReplaceRegularToChar(/\s+/g, '_');
}
function removeSpecChars() {
    helperReplaceRegularToChar(/(\(|\)|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\_|\=|\+|\[|\]|\\|\{|\}|\||\;|\'|\:|\"|\,|\/|\<|\>|\?)+/g, '');
}
function transformSpecCharsToSpace() {
    helperReplaceRegularToChar(/(\(|\)|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\_|\=|\+|\[|\]|\\|\{|\}|\||\;|\'|\:|\"|\,|\/|\<|\>|\?)+/g, ' ');
}
function search() {
    let texSearch = $('.main-module__input_search').val();
    let reg = new RegExp('(' + texSearch + ')', 'g')
    let texReplace = $('.main-module__input_replace').val();
    helperReplaceRegularToChar(reg, texReplace);
}
function removeDup() {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    list = removeDuplicate(tempList); 
    setTextAreaByArray(list);
    
}
function sort() {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    list = bubbleSort(tempList, false); // false или если ничего не указывать undefined то по алфовиту
    setTextAreaByArray(list);        
}
function reverceSort() {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    list = bubbleSort(tempList, true); // true не по алфовиту
    setTextAreaByArray(list);     
}
function undo() {
    let list = [];
    list = bufferUndo.shift();
    bufferForward.unshift(getArrayRowsTextArea());
    setTextAreaByArray(list);    
    checkNavigButton();
}
function forward() {
    let list = [];
    list = bufferForward.shift();
    bufferUndo.unshift(getArrayRowsTextArea());
    setTextAreaByArray(list);
    checkNavigButton();
}
function eraser() {
    $('.main-module__textarea').val('');
    bufferUndo = new Array(10);
    bufferForward = new Array(10);
    checkNavigButton();
}
function bubbleSort(list,type){                     
    let n = list.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            let next = j + 1;
            if (type) {
                if (list[next].trim() > list[j].trim() && /\S/.test(list[j])) { // ругулярка для того чтобы не сздавались пустые строки, .trim() для исключения пробелов участия в сотрировки
                    let temp;
                    temp = list[j];
                    list[j] = list[next];
                    list[next] = temp;
                }
            } else {
                if (list[next].trim() < list[j].trim() && /\S/.test(list[next])) {
                    let temp;
                    temp = list[next];
                    list[next] = list[j];
                    list[j] = temp;
                }
            }; 
        }
    }
    return list;
}
function removeDuplicate(list) {
    let n = list.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            if (list[i] === list[j]) {
                list.splice(j, 1);
                j--;
                n = list.length + 1;
            }
        }
    }
    console.log(list);
    return list;
}
function helperReplaceRegularToChar(regular, char) {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    for (let row of tempList) {
        list.push(row.replace(regular, char));
    }
    setTextAreaByArray(list);
}
function helperRowInnerOuterChar(innerChar, outerChar) {
    let tempList = [];
    let list = [];
    tempList = getArrayRowsTextArea();
    saveChanges(tempList);
    for (let row of tempList) {
        let firstChar = '';
        let lastChar = '';
        let i = 0;
        for (len = row.length; i < len; i++) {
            if (/\S/.test(row.charAt(i))) {
                firstChar += innerChar;
                lastChar += outerChar;
                break;
            } else {
                firstChar += row.charAt(i);
            };
        };
        list.push(firstChar + row.slice(i) + lastChar)
    }
    setTextAreaByArray(list);
}