<?php
function getCategories($conn) {
    try {
        $stmt = $conn->query("SELECT * FROM categories ORDER BY name");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
        return [];
    }
}

// Sample categories data (you can replace this with actual database data)
$sample_categories = [
    [
        'id' => 1,
        'name' => 'Electronics',
        'description' => 'Latest gadgets and electronic devices',
        'image' => 'https://via.placeholder.com/300x200'
    ],
    [
        'id' => 2,
        'name' => 'Fashion',
        'description' => 'Trendy clothing and accessories',
        'image' => 'https://via.placeholder.com/300x200'
    ],
    [
        'id' => 3,
        'name' => 'Home & Living',
        'description' => 'Home decor and furniture',
        'image' => 'https://via.placeholder.com/300x200'
    ]
];
?> 