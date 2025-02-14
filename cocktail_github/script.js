// Open the modal and store the cocktail name for later use
function openModal(cocktail) {
    document.getElementById('myModal').style.display = 'block';
    document.getElementById('myModal').setAttribute('data-cocktail', cocktail);
}

// Close the modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Submit the order form and save the order data in localStorage
function submitForm() {
    const cocktail = document.getElementById('myModal').getAttribute('data-cocktail');
    const name = document.getElementById('name').value;
    const notes = document.getElementById('notes').value;

    // Get the current time (timestamp)
    const timestamp = new Date().toISOString();

    // Create an order object
    const order = {
        cocktail: cocktail,
        name: name,
        notes: notes,
        timestamp: timestamp
    };

    // Retrieve existing orders from localStorage, or use an empty array if none exist
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Add the new order to the orders array
    orders.push(order);

    // Save the updated orders array back to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));

    // Hide the modal
    closeModal();

    // Open a new window to display the confirmation message
    const confirmationWindow = window.open('', '_blank', 'width=400,height=300');
    
    // Add content to the new window
    confirmationWindow.document.write(`
        <html>
            <head>
                <title>Order Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #121212;
                        color: #e0e0e0;
                        text-align: center;
                        text-item :center;
                        padding: 20px;
                    }
                    h3 {
                        color: #4CAF50; /* Green color for success */
                    }
                    p {
                        color: #bbb;
                    }
                </style>
            </head>
            <body>
                <h3>Thank you, ${name}!</h3>
                <p>Your order for a ${cocktail} has been received.</p>
                <p>We'll prepare it shortly.</p>
            </body>
        </html>
    `);

    // Close the modal and return focus to the main window (optional)
    window.focus();
}

// Optional: Add a function for displaying the orders in the queue
function displayOrders() {
    // Retrieve orders from localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Sort the orders by timestamp (ascending order)
    orders.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Select the order list container
    const orderList = document.getElementById('order-list');

    // Loop through the orders and display them on the page
    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.classList.add('order');

        // Fill in the order details (cocktail, name, notes, time)
        orderDiv.innerHTML = `
            <h4>${order.cocktail}</h4>
            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Note:</strong> ${order.notes}</p>
            <p><strong>Time:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
            <hr>
        `;

        // Append the order div to the list
        orderList.appendChild(orderDiv);
    });
}

// // If the current page is the order queue page, display orders
// if (window.location.pathname.includes('order-queue.html')) {
//     displayOrders();
// }
