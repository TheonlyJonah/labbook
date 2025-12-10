<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $xmlData = file_get_contents('php://input');
    if ($xmlData) {
        file_put_contents('sales.xml', $xmlData);
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No data received']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists('sales.xml')) {
        header('Content-Type: application/xml');
        readfile('sales.xml');
    } else {
        echo '<sales></sales>';
    }
}
?>