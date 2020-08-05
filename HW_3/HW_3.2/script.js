let btn = $('#btn');
let btnClear = $('#btn-clear');
let container = $('#container');

btn.on('click', () => {
    // jqueryAjax();
    axiosAjax();
});

function jqueryAjax(){
    $.ajax({
        method: "POST",
        url: "get-users"
    }).done(students => {
        let html = ''
        for(let student in students) {
            html += `<li>Имя: ${students[student].name}, Возраст: ${students[student].age}</li>`;
        }
        container.append(html);
    });
}

function axiosAjax(){
    axios({
        method: 'post',
        url: 'get-users'
    }).then(res => {
        let students = res.data;
        let html = ''
        for(let student in students) {
            html += `<li>Имя: ${students[student].name}, Возраст: ${students[student].age}</li>`;
        }
        container.append(html);
    }).catch(err => {
        console.log(err);
    });
}

btnClear.on('click', () => container.html(''));
