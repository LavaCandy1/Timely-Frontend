let inputBox = null;
let input = null;
let pseudo = null;

let before = '';

$(document).ready(()=>{
  init();
});

function init(){
  inputBox = $('.input-box');
  if(inputBox.length > 0){
    input = $('<input maxlength="24" class="input" type="text" >')
    pseudo = $('<div class="pseudo"></div>');
    inputBox.append(input);
    inputBox.append(pseudo);
    input.on('input', onChange);
  }
}

// Calculate the change of the text
function onChange(target){
  const { selectionStart: start, value: after } = target.currentTarget;
  
  // calculate the different starting points from both direction
  let p1 = 0, p2 = 0;
  // calclate end first
  for(; p2 < after.length - start; p2++){
    if(before[before.length - 1 - p2] === undefined || before[before.length - 1 - p2] !== after[after.length - 1 - p2]){
      break;
    }
  }
  // calclate start
  for(; p1 < after.length - p2 - (after.length > before.length ? 1 : 0); p1++){
    if(before[p1] !== after[p1] || p1 + p2 >= before.length){
      break;
    }
  }
  
  let insertedText = '';
  let insertPosition = -1;
  
  let deletedTextCount = 0;
  let deletePosition = -1;
  
  // has delete
  if(p1 + p2 < before.length){
    deletedTextCount = before.length - (p1 + p2);
    deletePosition = p1;
    removeText(deletePosition, deletedTextCount);
  }
  // has add
  if(p1 + p2 < after.length){
    insertedText = after.substr(p1, after.length - (p1 + p2));
    insertPosition = p1;
    addText(insertPosition, insertedText);
  }
  
  before = after;
}

function removeText(position, count){
  let remaining = count;
  let pointer = 0;
  for(let i = 0; i < pseudo.children().length && remaining > 0; i++){
    let element = $(pseudo.children()[i]);
    if(element.hasClass('delete')){
      continue;
    }
    
    if(pointer >= position){
      element.addClass('delete');
      element.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
      (e)=>{
        element.remove();
      });
      remaining--;
    }
    pointer++;
  }
}

function addText(position, text){
  if(position == 0){
    for(let i = 0; i < text.length; i++){
      pseudo.append(`<span class="show">${escapeHtml(text[i])}</span>`);
    }
    return;
  }
  
  let target = null;
  let pointer = 0;
  for(let i = 0; i <= pseudo.children().length; i++){
    
    let element = $(pseudo.children()[i]);
    if(element.hasClass('delete')){
      continue;
    }
    
    if(pointer >= position - 1){
      target = element;
      break;
    }
    pointer++;
  }
  if(target){
    for(let i = 0; i < text.length; i++){
      target.after(`<span class="show">${escapeHtml(text[i])}</span>`);
    }
  }
  
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/\s/g, "&nbsp;")
         .replace(/'/g, "&#039;");
 }