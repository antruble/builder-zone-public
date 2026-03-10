<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Upload-Secret');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// ── Auth ──────────────────────────────────────────────
$secret = 'boulderzona-upload-2024'; // Egyezzen a VITE_UPLOAD_SECRET értékével
$incoming = $_SERVER['HTTP_X_UPLOAD_SECRET'] ?? '';

if ($incoming !== $secret) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// ── Fájl ellenőrzés ───────────────────────────────────
if (empty($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file']);
    exit;
}

$file = $_FILES['file'];

$allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
if (!in_array($file['type'], $allowed, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type']);
    exit;
}

if ($file['size'] > 10 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['error' => 'File too large (max 10 MB)']);
    exit;
}

// ── Mentés ────────────────────────────────────────────
$ext      = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$filename = uniqid('img_', true) . '.' . $ext;
$uploadDir = __DIR__ . '/uploads/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (!move_uploaded_file($file['tmp_name'], $uploadDir . $filename)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
    exit;
}

// ── Válasz ────────────────────────────────────────────
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host     = $_SERVER['HTTP_HOST'];
$url      = $protocol . '://' . $host . '/uploads/' . $filename;

echo json_encode(['url' => $url]);
