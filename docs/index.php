<?php

require("./lib/Parsedown.php");
$parsedown = new Parsedown();

$url = "markdown/user.md";
if($_GET['p']==="developer") {
    $url = "markdown/developer.md";
}

$content = $parsedown->text(file_get_contents($url));
//$content = $parsedown->text($developer);

$content = preg_replace('/([^"\']*)\.md/', '$1', $content);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Logical Network Editor</title>

    <link href="https://fonts.googleapis.com/css?family=Inconsolata|Open+Sans:400,400i,700&amp;subset=latin-ext" rel="stylesheet">
    <link href="../css/lib/normalize.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <?php echo $content; ?>
</body>
</html>

