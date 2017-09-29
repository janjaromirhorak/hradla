<?php
$sourceFolder = "text";
$generatedFolder = "html";

// load the "head" contents
ob_start();
include "include/head.inc";
$head = ob_get_clean();

require("texy/texy.php");
$texy = new Texy();


$p = "user";
if($_GET['p']==="developer") {
    $p = "developer";;
}

$url = $sourceFolder . "/" . $p . ".md";

// load the Texy file
$content = $texy->process(file_get_contents($url));

// create the HTML document
$main = "<!DOCTYPE html><html><head>$head</head><body>$content</body></html>";

// create the html folder if it doesn't exist
if (!file_exists($generatedFolder)) {
    mkdir($generatedFolder, 0777, true);
}

$filename = $generatedFolder . "/". $p . ".html";

// save the content to file
file_put_contents($filename, $main);

// display the page
echo $main;