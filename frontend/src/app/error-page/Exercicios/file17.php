<?php

if(isset($_POST["send"])){
    // A validação de tipo de ficheiro internamente no servidor
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $detected_format = finfo_file($finfo, $_FILES["cv"]["tmp_name"]);


    $allowed_formats = [
        "pdf" => "application/pdf",
        "png" => "image/png",
        "odt" => "application/vnd.oasis.opendocument.text",
        "docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if(
        !empty($_POST["full_name"]) &&
        !empty($_POST["job_title"]) &&
        $_FILES["cv"]["error"] === 0 &&
        $_FILES["cv"]["size"] > 0 &&
        $_FILES["cv"]["size"] < 4000000 &&
        in_array($detected_format, $allowed_formats)
    ){
        $message = "A sua candidatura foi aceite com sucesso";

        // Criar nome aleatório e selecionar a extensão correcta

        $filename = date("Ymd") . "_" . bin2hex(random_bytes(4));
        $extension = "." . array_search($detected_format, $allowed_formats);

        move_uploaded_file( $_FILES["cv"]["tmp_name"], "uploads/" .$filename.$extension );


    } else{
        $message = " Ficheiro incorreto, use apenas PDF, DOCX ou ODT.";

    }
}

?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        if(isset($message)){
            echo '<p role="alert">' .$message. '</p>';
        }
    
    ?>
    <form method="post" action="file17.php" enctype="multipart/form-data">
    <div>
        <label>
            Nome Completo
            <input type="text" name="full_name">
        </label>
    </div>
    <div>
        <label>
            Cargo que concorre
            <select name="job_title">
                <option> Educador </option>
                <option> Canalizador </option>
                <option> Mecânico </option>
                <option> Assistência ao Cliente </option>
            </select>
        </label>
    </div>
    <div>
        <label>
             Curriculum
             <input type="file" name="cv" accept=".pdf, .docx, .odt" required>
        </label>
    </div>
    <div>
        <button type="submit" name="send"> Enviar </button>
    </div>
    </form>
    
</body>
</html>