# react-vite-widget-sdk-template
A boilerplate for building React-based widget SDKs with Vite, designed for embedding via external scripts

# Clone this repo
```bash
git clone https://github.com/code4mk/react-vite-widget-sdk-template.git
```

# Install dependencies
```bash
pnpm install
```

# Run the development server
```bash
pnpm run dev
```

# Build the production version
```bash
pnpm run build
```

```bash
build/
├── sdk-widget.css
└── sdk-widget.iife.js
```

# how to setup sdk widget as external script

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Widget Development</title>
    <link rel="stylesheet" href="sdk-widget.css">
  </head>
  <body class="font-sans">
    <!-- your code hee -->
    
    <script src="sdk-widget.iife.js"></script>
    <script>
      window.addEventListener('load', () => {
        window.initSdkWidget({
          company_name: 'company name',
          company_slug: 'company slug',
          additional_open_id: 'sdk_widget_button' // optional
        });
      });
    </script>
  </body>
</html> 
```

---

<div align="center">

💼 **Want to build your own widget (sdk)?**  
📧 [hiremostafa@gmail.com](mailto:hiremostafa@gmail.com)  
🚀 Available for hire

</div>


