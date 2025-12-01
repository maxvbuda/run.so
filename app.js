// Get DOM elements
const runbookEditor = document.getElementById('runbookEditor');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const publishBtn = document.querySelector('.publish-btn');
const integrationToggle = document.querySelector('.integration-toggle');

// Message input functionality
if (messageInput && sendBtn) {
    const handleSend = () => {
        const message = messageInput.value.trim();
        if (message) {
            console.log('Sending message:', message);
            // Here you would typically send the message to a backend
            messageInput.value = '';
            messageInput.focus();
        }
    };

    sendBtn.addEventListener('click', handleSend);

    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // Focus message input on load
    messageInput.focus();
}

// Publish button
if (publishBtn) {
    publishBtn.addEventListener('click', () => {
        const content = runbookEditor ? runbookEditor.textContent : '';
        console.log('Publishing runbook:', content);
        // Here you would typically save/publish the runbook
        alert('Runbook published! (This is a demo)');
    });
}

// Integration toggle
if (integrationToggle) {
    integrationToggle.addEventListener('click', () => {
        const arrow = integrationToggle.querySelector('.toggle-arrow');
        if (arrow) {
            const isExpanded = arrow.style.transform === 'rotate(90deg)';
            arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
        }
        // Here you would toggle integration details
    });
}

// Navigation items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all nav items in the same parent
        const parent = item.closest('.sidebar-nav, .sidebar-footer');
        if (parent) {
            parent.querySelectorAll('.nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
        }
        // Add active class to clicked item
        item.classList.add('active');
        
        // Here you would navigate to the selected page
        console.log('Navigating to:', item.querySelector('span').textContent);
    });
});

// Formatting toolbar buttons
document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const action = btn.getAttribute('title');
        console.log('Formatting action:', action);
        
        if (!runbookEditor) return;
        
        // Basic formatting actions
        if (action === 'Bold') {
            document.execCommand('bold', false, null);
        } else if (action === 'Italic') {
            document.execCommand('italic', false, null);
        } else if (action === 'Heading') {
            document.execCommand('formatBlock', false, '<h2>');
        } else if (action === 'Bullet List') {
            document.execCommand('insertUnorderedList', false, null);
        } else if (action === 'Numbered List') {
            document.execCommand('insertOrderedList', false, null);
        } else if (action === 'Undo') {
            document.execCommand('undo', false, null);
        } else if (action === 'Redo') {
            document.execCommand('redo', false, null);
        }
        
        runbookEditor.focus();
    });
});

// Initialize editor
if (runbookEditor) {
    runbookEditor.addEventListener('input', () => {
        // Auto-save or update preview could go here
    });

    runbookEditor.addEventListener('focus', () => {
        // Editor focused
    });
}

console.log('run.so application initialized');
