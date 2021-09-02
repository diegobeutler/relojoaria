function resetPass(){
    var email = $("#email").val();

    $.ajax({
        type: $('#formReset').attr('method'),
        url: $('#formReset').attr('action'),
        contentType : 'application/json',
        data : email,
        success: function() {
            Swal.fire({
                title: 'Enviado!',
                text: 'E-mail enviado com sucesso!',
                type: 'success'
            }).then((result) => {
                    window.location = '/';
                }
            );
        },
        error: function(data) {
            console.log(data);
            Swal.fire('Errou!', 'Falha ao salvar registro!', 'error');
        }
    });
    return false;

}