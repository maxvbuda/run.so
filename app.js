// Default code templates for each language
const codeTemplates = {
    javascript: `console.log("Hello, run.so!");
console.log("This is JavaScript running in your browser!");`,
    python: `print("Hello, run.so!")
print("This is Python code!")`,
    html: `<html>
<head>
    <title>Hello run.so</title>
</head>
<body>
    <h1>Hello, run.so!</h1>
    <p>This is HTML rendered in your browser.</p>
</body>
</html>`,
    css: `body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
}

h1 {
    font-size: 3rem;
    text-align: center;
}`,
    typescript: `function greet(name: string): string {
    return \`Hello, \${name}! Welcome to run.so\`;
}

console.log(greet("TypeScript"));`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, run.so!");
        System.out.println("This is Java code.");
    }
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, run.so!" << endl;
    cout << "This is C++ code." << endl;
    return 0;
}`,
    rust: `fn main() {
    println!("Hello, run.so!");
    println!("This is Rust code.");
}`
};

// Get DOM elements
const codeEditor = document.getElementById('codeEditor');
const output = document.getElementById('output');
const languageSelect = document.getElementById('languageSelect');
const runBtn = document.getElementById('runBtn');
const shareBtn = document.getElementById('shareBtn');
const formatBtn = document.getElementById('formatBtn');
const clearBtn = document.getElementById('clearBtn');
const clearOutputBtn = document.getElementById('clearOutputBtn');

// Initialize with default code
let currentLanguage = languageSelect.value;
loadTemplate(currentLanguage);

// Language change handler
languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    loadTemplate(currentLanguage);
});

// Run button handler
runBtn.addEventListener('click', () => {
    runCode();
});

// Keyboard shortcut: Ctrl/Cmd + Enter to run
codeEditor.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
    }
});

// Share button handler
shareBtn.addEventListener('click', () => {
    shareCode();
});

// Format button handler
formatBtn.addEventListener('click', () => {
    formatCode();
});

// Clear button handlers
clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the code editor?')) {
        codeEditor.value = '';
        codeEditor.focus();
    }
});

clearOutputBtn.addEventListener('click', () => {
    output.textContent = '';
});

// Load template for selected language
function loadTemplate(language) {
    const currentCode = codeEditor.value.trim();
    if (!currentCode || currentCode === codeTemplates[language]) {
        codeEditor.value = codeTemplates[language] || '';
    }
}

// Execute code based on language
function runCode() {
    const code = codeEditor.value;
    output.textContent = '';
    output.className = 'output';
    
    // Add loading indicator
    const loading = document.createElement('div');
    loading.className = 'loading';
    output.appendChild(loading);
    
    // Simulate execution delay
    setTimeout(() => {
        loading.remove();
        try {
            executeCode(code, currentLanguage);
        } catch (error) {
            displayError(error.message);
        }
    }, 300);
}

// Execute code
function executeCode(code, language) {
    switch (language) {
        case 'javascript':
            executeJavaScript(code);
            break;
        case 'python':
            displayMessage('Python execution would require a backend server. This is a frontend-only demo.', 'warning');
            break;
        case 'html':
            executeHTML(code);
            break;
        case 'css':
            executeCSS(code);
            break;
        case 'typescript':
            displayMessage('TypeScript execution would require compilation. This is a frontend-only demo.', 'warning');
            break;
        case 'java':
            displayMessage('Java execution would require a backend server with JVM. This is a frontend-only demo.', 'warning');
            break;
        case 'cpp':
            displayMessage('C++ execution would require compilation and a backend server. This is a frontend-only demo.', 'warning');
            break;
        case 'rust':
            displayMessage('Rust execution would require compilation and a backend server. This is a frontend-only demo.', 'warning');
            break;
        default:
            displayMessage('Language not supported yet.', 'error');
    }
}

// Execute JavaScript
function executeJavaScript(code) {
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    let outputText = '';
    
    console.log = (...args) => {
        outputText += args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ') + '\n';
    };
    
    console.error = (...args) => {
        outputText += args.map(arg => String(arg)).join(' ') + '\n';
        output.className = 'output output-error';
    };
    
    console.warn = (...args) => {
        outputText += args.map(arg => String(arg)).join(' ') + '\n';
    };
    
    try {
        // Create a safe execution context
        const result = eval(code);
        if (result !== undefined && result !== null) {
            outputText += String(result) + '\n';
        }
        output.textContent = outputText || 'Code executed successfully. (No output)';
        if (outputText) {
            output.className = 'output output-success';
        }
    } catch (error) {
        displayError(error.message);
    } finally {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
    }
}

// Execute HTML
function executeHTML(code) {
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '400px';
    iframe.style.border = '1px solid var(--border-color)';
    iframe.style.borderRadius = '6px';
    iframe.style.background = 'white';
    
    output.innerHTML = '';
    output.appendChild(iframe);
    
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(code);
    iframeDoc.close();
}

// Execute CSS
function executeCSS(code) {
    const style = document.createElement('style');
    style.textContent = code;
    
    const preview = document.createElement('div');
    preview.style.cssText = 'padding: 2rem; background: white; color: black; min-height: 200px;';
    preview.innerHTML = '<h1>CSS Preview</h1><p>This is a preview of your CSS styles.</p>';
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = code;
    preview.appendChild(styleSheet);
    
    output.innerHTML = '';
    output.appendChild(preview);
}

// Display error message
function displayError(message) {
    output.textContent = `Error: ${message}`;
    output.className = 'output output-error';
}

// Display message
function displayMessage(message, type = 'info') {
    output.textContent = message;
    if (type === 'error') {
        output.className = 'output output-error';
    } else if (type === 'success') {
        output.className = 'output output-success';
    }
}

// Share code (copy to clipboard)
function shareCode() {
    const code = codeEditor.value;
    const language = languageSelect.value;
    const shareData = {
        language,
        code
    };
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?code=${encodeURIComponent(code)}&lang=${language}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = 'Copied!';
        setTimeout(() => {
            shareBtn.innerHTML = originalText;
        }, 2000);
    }).catch(() => {
        alert('Failed to copy share URL. Please copy the code manually.');
    });
}

// Format code (basic JavaScript formatting)
function formatCode() {
    if (currentLanguage !== 'javascript') {
        displayMessage('Code formatting is currently only available for JavaScript.', 'warning');
        return;
    }
    
    try {
        // Basic formatting - in a real app, you'd use a proper formatter like Prettier
        let code = codeEditor.value;
        
        // Add basic indentation (simplified)
        code = code
            .replace(/\{/g, ' {\n    ')
            .replace(/\}/g, '\n}\n')
            .replace(/;/g, ';\n')
            .replace(/\n\s*\n/g, '\n');
        
        codeEditor.value = code;
        displayMessage('Code formatted (basic formatting applied).', 'success');
    } catch (error) {
        displayError('Failed to format code: ' + error.message);
    }
}

// Load code from URL parameters
function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const lang = params.get('lang');
    
    if (code) {
        codeEditor.value = decodeURIComponent(code);
    }
    
    if (lang && codeTemplates[lang]) {
        languageSelect.value = lang;
        currentLanguage = lang;
    }
}

// Initialize from URL on load
loadFromURL();

