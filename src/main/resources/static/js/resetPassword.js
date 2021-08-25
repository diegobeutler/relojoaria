
function resetPass(){
    var email = $("#email").val();
    var serverContext = $('#formReset').attr('action').replace('/usuario/reset','')
    // $.post( $('#formReset').attr('action'),{email: email} ,
    //     function(data){
    //         window.location.href =
    //             serverContext + "login?message=" + data.message;
    //     })
    //     .fail(function(data) {
    //         if(data.responseJSON.error.indexOf("MailError") > -1)
    //         {
    //             window.location.href = serverContext + "emailError.html";
    //         }
    //         else{
    //             window.location.href =
    //                 serverContext + "login?message=" + data.responseJSON.message;
    //         }
    //     });

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