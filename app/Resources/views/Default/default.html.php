<?php
$this->headScript()->appendFile('/vue-app/js/app.js');
$this->headLink()->appendStylesheet('/vue-app/css/app.css');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <?= $this->headLink() ?>
</head>

<style type="text/css">
    body {
        padding: 0;
        margin: 0;
        font-family: "Lucida Sans Unicode", Arial;
        font-size: 14px;
    }

    #site {
        margin: 0 auto;
    }

</style>
<body>

<div id="site">
    <div id="app"></div>
</div>
<?= $this->headScript() ?>
</body>
</html>
