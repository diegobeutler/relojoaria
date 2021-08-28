
function resetPass(){
    var email = $("#email").val();

    $.ajax({
        type: $('#formReset').attr('method'),
        url: $('#formReset').attr('action'),
        contentType : 'application/json',
        data : email,
        success: function() {
            Swal.fire({
                title: 'Salvo!',
                text: 'Registro salvo com sucesso!',
                type: 'success'
            }).then((result) => {
                    window.location = urlDestino;
                }
            );//FIM swal()
        },
        error: function(data) {
            console.log(data);
            Swal.fire('Errou!', 'Falha ao salvar registro!', 'error');
        }
    }); //FIM ajax()
    return false;

}