$(document).ready(function() {
    // Add to cart functionality
    $(document).on('click', '.add-to-cart', function(e) {
        e.preventDefault();
        var $btn = $(this);
        var productId = $btn.closest('.product-card').data('product-id');
        
        if (!productId) {
            showNotification('Error: Product ID not found', 'error');
            return;
        }
        
        // Disable button and show loading state
        $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Adding...');
        
        $.ajax({
            url: 'cart.php',
            type: 'POST',
            data: {
                add_to_cart: true,
                product_id: productId,
                quantity: 1
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Update cart count
                    updateCartCount();
                    
                    // Show success message
                    showNotification('Product added to cart successfully!');
                    
                    // Update button state
                    $btn.html('<i class="fas fa-check"></i> Added');
                    $btn.removeClass('btn-primary').addClass('btn-success');
                    
                    setTimeout(function() {
                        $btn.html('<i class="fas fa-shopping-cart"></i> Add to Cart');
                        $btn.removeClass('btn-success').addClass('btn-primary');
                    }, 2000);
                } else {
                    showNotification(response.message || 'Error adding product to cart', 'error');
                }
            },
            error: function(xhr, status, error) {
                showNotification('Error: ' + error, 'error');
            },
            complete: function() {
                $btn.prop('disabled', false);
            }
        });
    });

    // Increase quantity
    $(document).on('click', '.increase-quantity', function() {
        var $input = $(this).siblings('.quantity-input');
        var newValue = parseInt($input.val()) + 1;
        $input.val(newValue).trigger('change');
    });

    // Decrease quantity
    $(document).on('click', '.decrease-quantity', function() {
        var $input = $(this).siblings('.quantity-input');
        var newValue = parseInt($input.val()) - 1;
        if (newValue >= 1) {
            $input.val(newValue).trigger('change');
        }
    });

    // Update quantity
    $(document).on('change', '.quantity-input', function() {
        var $input = $(this);
        var productId = $input.closest('tr').find('.remove-item').data('product-id');
        var quantity = parseInt($input.val());
        
        if (quantity < 1) {
            quantity = 1;
            $input.val(1);
        }
        
        $.ajax({
            url: 'cart.php',
            type: 'POST',
            data: {
                update_quantity: true,
                product_id: productId,
                quantity: quantity
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Update cart count
                    updateCartCount();
                    
                    // Update cart total
                    updateCartTotal();
                    
                    // Update item total
                    var $row = $input.closest('tr');
                    var price = parseFloat($row.find('td:eq(1)').text().replace('$', ''));
                    var total = price * quantity;
                    $row.find('td:eq(3)').text('$' + total.toFixed(2));
                    
                    showNotification('Quantity updated successfully!');
                } else {
                    showNotification(response.message || 'Error updating quantity', 'error');
                }
            },
            error: function(xhr, status, error) {
                showNotification('Error: ' + error, 'error');
            }
        });
    });

    // Remove item from cart
    $(document).on('click', '.remove-item', function() {
        var $btn = $(this);
        var productId = $btn.data('product-id');
        
        $.ajax({
            url: 'cart.php',
            type: 'POST',
            data: {
                remove_from_cart: true,
                product_id: productId
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Remove the row
                    $btn.closest('tr').fadeOut(300, function() {
                        $(this).remove();
                        
                        // Update cart count and total
                        updateCartCount();
                        updateCartTotal();
                        
                        // Check if cart is empty
                        if ($('.cart-items tr').length === 0) {
                            location.reload();
                        }
                    });
                    
                    showNotification('Item removed from cart');
                } else {
                    showNotification(response.message || 'Error removing item', 'error');
                }
            },
            error: function(xhr, status, error) {
                showNotification('Error: ' + error, 'error');
            }
        });
    });

    // Update cart total
    function updateCartTotal() {
        $.ajax({
            url: 'cart.php',
            type: 'GET',
            data: { get_cart_total: true },
            dataType: 'json',
            success: function(total) {
                $('.cart-total').text('$' + parseFloat(total).toFixed(2));
            }
        });
    }

    // Update cart count
    function updateCartCount() {
        $.ajax({
            url: 'cart.php',
            type: 'GET',
            data: { get_cart_count: true },
            dataType: 'json',
            success: function(count) {
                $('.cart-count').text(count);
            }
        });
    }

    // Show notification
    function showNotification(message, type = 'success') {
        // Remove any existing notifications
        $('.notification').remove();
        
        var $notification = $('<div class="notification ' + type + '">' + message + '</div>');
        $('body').append($notification);
        
        setTimeout(function() {
            $notification.css('animation', 'slideOut 0.3s ease-out forwards');
            setTimeout(function() {
                $notification.remove();
            }, 300);
        }, 3000);
    }

    // Initialize cart count and total on page load
    updateCartCount();
    updateCartTotal();
}); 