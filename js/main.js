$(document).ready(()=>{
const save_text = document.getElementById('save-text');


    // code for the convertion to markdown file
const textarea = document.getElementById('markdown'),
    target = document.getElementById('preview');

function run(text) {
      var converter = new showdown.Converter(),
        html = converter.makeHtml(text);
      
      target.innerHTML = html;
      return html
  }

textarea.addEventListener('input',()=>{
    run(textarea.value)
    save_text.innerText = 'Save Changes'
})


    // code for saving the markdown file
const save_btn = document.getElementById('save-file')
save_btn.addEventListener('click',save)
let filename;
function save() {
    let file = localStorage.getItem('markdown')
    if (!file) {
        filename = 'markdown.md'
    }else{
        filename = JSON.parse(file).filename
    }
    console.log(filename);

    
    let Filecontent = textarea.value;
    let Filename = filename;   
    
    let content = {
        filename : Filename,
        filecontent : Filecontent
    }
    content = JSON.stringify(content)

    localStorage.setItem('markdown',content)
    save_text.innerText = 'Saved..'
}



    // code for renaming files
const rename_form = document.getElementById('rename_form');
const input = document.getElementById('filename')
rename_form.addEventListener('submit',(e)=>{
    rename(input.value)
    console.log(input.value);
})

function rename(filename) {
    console.log('renameing');
    let content = localStorage.getItem('markdown')

    content = JSON.parse(content)
    content.filename = filename

    content = JSON.stringify(content)
    console.log(content);
    localStorage.setItem('markdown',content)
}

// code that displays the filename in the 
// required part of the page 
const md_display = $('.md-display');
function display_in_frontend() {
    if (localStorage.getItem('markdown')) {
        let file = JSON.parse(localStorage.getItem('markdown'))

        // console.log(filename);
        md_display.text(file.filename)
    
        textarea.innerHTML = file.filecontent
        run(file.filecontent)
    
    }
}

display_in_frontend()



//code to delete the file
const dialog = document.getElementById('diag');
const deleteIcon = $('#delete-icon')
const deleteBtn = $('#delete-btn');

deleteIcon.click(()=>{
    dialog.showModal()
})

deleteBtn.click(deleteMarkdown)
function deleteMarkdown() {
    localStorage.removeItem('markdown')
    dialog.close()
}


//code for downloading the markdown file
const downloadMdBtn = $('.download-md');
const downloadHtmlBtn = $('.download-html');

function download(content,filename) {
    var blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
       });
    
    saveAs(blob, filename);
           
}

downloadMdBtn.click(()=>{
    if (localStorage.getItem('markdown')) {
        let file = JSON.parse(localStorage.getItem('markdown'));
        let content = file.filecontent;
        let filename = file.filename;
        
        download(content,filename);
    
    }else{
        $('#diag').find('span').text('please save your file first')
        $('#diag').showModal()
    }
})

downloadHtmlBtn.click(()=>{
    if (localStorage.getItem('markdown')) {
        let file = JSON.parse(localStorage.getItem('markdown'));
        let content = run(file.filecontent);
        let filename = file.filename.slice(0,-3) + '.html';
        
        download(content,filename);
    
    }else{
        $('#diag').find('span').text('please save your file first')
        $('#diag').showModal()
    }
})


//code for toggling the light and dark mode
const modeBtn = $('.mode')
function changeMode() {
 
    $('.text-white').toggleClass('text-black')
    $('.text-light').toggleClass('text-dark')

    $('.bg-dark').toggleClass('bg-light')
    $('.bg-black').toggleClass('bg-white')

    $('.bg-bldark').toggleClass('bg-light')

}
modeBtn.click(changeMode)

//working on new file
function newFile(params) {    
    deleteMarkdown();
    document.location.reload()
}

})