<?php
    $conf = file_get_contents('config.json');
    $conf = json_decode($conf, true);
?>

<?php if($conf['analytics']) { ?>
<!-- Global Site Tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-84321302-2"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)};
    gtag('js', new Date());

    gtag('config', '<?php echo $conf['analytics']; ?>');
</script>
<?php } ?>

<meta charset="utf-8">
<title><?php echo $conf['title']; ?></title>

<link href="https://fonts.googleapis.com/css?family=Inconsolata|Open+Sans:400,400i,700&amp;subset=latin-ext" rel="stylesheet">
<link href="css/style.min.css" rel="stylesheet">