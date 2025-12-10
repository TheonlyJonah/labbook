<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $xmlData = file_get_contents('php://input');
    if ($xmlData) {
        file_put_contents('employees.xml', $xmlData);
        echo 'XML saved successfully';
    } else {
        echo 'No data received';
    }
} else {
    echo 'Invalid request method';
}
?>