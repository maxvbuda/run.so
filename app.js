// DOM Elements
const editor = document.getElementById('editor');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const publishBtn = document.querySelector('.publish-btn');
const integrationToggle = document.querySelector('.integration-toggle');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

// Editor functionality
if (editor) {
    // Focus editor on click
    editor.addEventListener('focus', () => {
        // Place cursor at end if empty
    });

    // Handle keyboard shortcuts
    editor.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + B for bold
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            document.execCommand('bold', false, null);
        }
        // Ctrl/Cmd + I for italic
        if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
            e.preventDefault();
            document.execCommand('italic', false, null);
        }
    });
}

// Chat input functionality
if (chatInput && sendBtn) {
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (message) {
            console.log('Sending:', message);
            // Add message to activity panel
            const activityContent = document.querySelector('.activity-content');
            if (activityContent) {
                const msgEl = document.createElement('div');
                msgEl.style.cssText = 'padding: 0.75rem; background: #f5f5f5; border-radius: 8px; margin-bottom: 0.5rem; font-size: 0.875rem;';
                msgEl.textContent = message;
                activityContent.appendChild(msgEl);
                
                // Update header
                const header = document.querySelector('.activity-header');
                if (header) {
                    header.textContent = 'Activity';
                }
            }
            chatInput.value = '';
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// Publish button
if (publishBtn) {
    publishBtn.addEventListener('click', () => {
        const content = editor ? editor.innerHTML : '';
        console.log('Publishing:', content);
        
        // Visual feedback
        const originalHTML = publishBtn.innerHTML;
        publishBtn.innerHTML = '<span>Published!</span>';
        publishBtn.style.background = '#10b981';
        
        setTimeout(() => {
            publishBtn.innerHTML = originalHTML;
            publishBtn.style.background = '';
        }, 2000);
    });
}

// Integration toggle
if (integrationToggle) {
    integrationToggle.addEventListener('click', () => {
        integrationToggle.classList.toggle('expanded');
    });
}

// Sidebar toggle (mobile)
if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

// Formatting toolbar buttons
document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.getAttribute('title');
        
        if (!editor) return;
        editor.focus();
        
        switch (action) {
            case 'Bold':
                document.execCommand('bold', false, null);
                break;
            case 'Italic':
                document.execCommand('italic', false, null);
                break;
            case 'Heading':
                document.execCommand('formatBlock', false, '<h2>');
                break;
            case 'Bullet List':
                document.execCommand('insertUnorderedList', false, null);
                break;
            case 'Numbered List':
                document.execCommand('insertOrderedList', false, null);
                break;
            case 'Undo':
                document.execCommand('undo', false, null);
                break;
            case 'Redo':
                document.execCommand('redo', false, null);
                break;
        }
    });
});

// Navigation handling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active from all
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active to clicked
        link.classList.add('active');
        
        // Close mobile sidebar
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    });
});

console.log('Run.so initialized');

