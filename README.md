# run.so

A modern, browser-based code playground and execution platform. Write, run, and share code in multiple programming languages.

![run.so](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 🚀 **Multi-language Support**: JavaScript, Python, HTML, CSS, TypeScript, Java, C++, and Rust
- 💻 **Live Code Execution**: Run JavaScript directly in your browser
- 🎨 **Modern UI**: Beautiful, dark-themed interface with syntax highlighting
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔗 **Share Code**: Generate shareable links for your code snippets
- ⚡ **Keyboard Shortcuts**: Use `Ctrl/Cmd + Enter` to run your code quickly

## Getting Started

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/maxvbuda/run.so.git
cd run.so
```

2. Open `index.html` in your browser, or use a local server:
```bash
npm start
# or
npx serve .
```

3. Start coding!

### Installation

No build process required! This is a pure HTML/CSS/JavaScript application that runs directly in your browser.

For local development, you can use any static file server:
- `npx serve .`
- `python -m http.server`
- `php -S localhost:8000`

## Usage

1. **Select a Language**: Choose your preferred programming language from the dropdown
2. **Write Code**: Type or paste your code in the editor
3. **Run Code**: Click the "Run" button or press `Ctrl/Cmd + Enter`
4. **View Output**: See the results in the output panel on the right
5. **Share**: Click "Share" to generate a shareable link

## Supported Languages

- ✅ JavaScript (fully functional in browser)
- ⚠️ Python (requires backend server)
- ✅ HTML (renders in preview)
- ✅ CSS (applies styles to preview)
- ⚠️ TypeScript (requires compilation)
- ⚠️ Java (requires backend with JVM)
- ⚠️ C++ (requires compilation)
- ⚠️ Rust (requires compilation)

> **Note**: Currently, only JavaScript, HTML, and CSS run directly in the browser. Other languages require backend infrastructure for full execution.

## Project Structure

```
run.so/
├── index.html      # Main HTML file
├── styles.css      # Stylesheet
├── app.js          # Main JavaScript application
├── package.json    # Project metadata
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

## Features in Detail

### Code Editor
- Clean, minimal interface
- Monospace font for better code readability
- Tab support for indentation
- Real-time editing

### Output Panel
- Shows execution results
- Error handling and display
- Scrollable for long outputs
- HTML/CSS preview support

### Sharing
- Generate shareable URLs with encoded code
- Share your code with others instantly
- Load code from shared URLs automatically

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Run code
- Standard text editor shortcuts supported

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

Created by [maxvbuda](https://github.com/maxvbuda)

---

**Inspired by [run.so](https://run.so)** - A platform for code execution and sharing.
