<?php
$countries = ["Portugal", "Espanha", "Brasil", "França", "Itália", "Dinamarca"];

if (isset($_POST["send"])) {

    if(
        !empty($_POST["full_name"]) &&
        !empty($_POST["password"]) &&

        filter_var($_POST["email"], FILTER_VALIDATE_EMAIL) &&
        $_POST["password"] === $_POST["password_confirm"] &&
        mb_strlen($_POST["password"]) >= 8 &&
        mb_strlen($_POST["password"]) <= 1000 &&
        mb_strlen($_POST["full_name"]) >= 3 &&
        mb_strlen($_POST["full_name"]) <= 60 &&
        in_array($_POST["country"], $countries)
    ) {
        $message = "Registo criado com sucesso";
    }
    else {
        $message = "Os registos não estão preenchidos corretamente";

    }
}     
    // 10:00 3ª Aula
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Validação de Formulários </title>
</head>
<body>
    <?php
        if (isset($message)) {
            echo '<p role="alert">' .$message. '</p>';
        }
    ?>
    <form method="post" action="file9.php">
        <div>
            <label>
                Nome Completo
                <input type="text" name="full_name" minlength="3" maxlength="60" required>
            </label>
        </div>
        <div>
            <label>
                Email
                <input type="email" name="email" required>
            </label>
        </div>
        <div>
            <label>
                Password
                <input type="password" name="password" required minlength="8" maxlength="50">
            </label>
        </div>
        <div>
            <label>
                Repetir Password
                <input type="password" name="password_confirm" required minlength="8" maxlength="50">
            </label>
        </div>
        <div>
            <label>
                País
                <select name="country">
                <?php
                foreach($countries as $country)
                    echo '<option>' .$country. '</option>';
            
                ?>
                </select>
            </label>
        </div>
        <div>
            <button type="submit" name="send"> Criar Conta </button>
        </div>
    </form>
</body>
</html>