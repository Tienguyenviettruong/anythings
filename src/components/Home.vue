<template>
  <div class="home">
    <main class="container">
        <h1>Create a Project</h1>
      <p>
        One thing that makes Tauri so flexible is its ability to work with virtually any frontend framework. 
        We've created the create-tauri-app utility to help you create a new Tauri project using one of the officially maintained framework templates.
      </p>
      <p>
        create-tauri-app currently includes templates for vanilla (HTML, CSS and JavaScript without a framework), 
        Vue.js, Svelte, React, SolidJS, Angular, Preact, Yew, Leptos, and Sycamore. 
        You can also find or add your own community templates and frameworks in the Awesome Tauri repo.
      </p>
      <p>
        Alternatively, you can add Tauri to an existing project to quickly turn your existing codebase into a Tauri app.
      </p>
      <h2>Using create-tauri-app</h2>
      <p>
        To get started using create-tauri-app run one of the below commands in the folder you'd like to setup your project. 
        If you're not sure which command to use we recommend the Bash command on Linux and macOS and the PowerShell command on Windows.
      </p>
      <pre>
        <code>
          pnpm create tauri-app
        </code>
      </pre>
      <p>Follow along with the prompts to choose your project name, frontend language, package manager, and frontend framework options if applicable.</p>
      <h2>Not sure what to choose?</h2>
      <p>
        We recommend starting with the vanilla template (HTML, CSS, and JavaScript without a frontend framework) to get started. You can always integrate a frontend framework later.
      </p>
      <ul>
        <li>Choose which language to use for your frontend: TypeScript / JavaScript</li>
        <li>Choose your package manager: pnpm</li>
        <li>Choose your UI template: Vanilla</li>
        <li>Choose your UI flavor: TypeScript</li>
      </ul>
      <p>After create-tauri-app has completed you can navigate into your project's folder, install dependencies, then use the Tauri CLI to start the development server:</p>
      <pre>
        <code>
          cd tauri-app
          cargo tauri dev
        </code>
      </pre>
      <p>You'll now see a new window open with your app running.</p>
      <p>Congratulations! You've made your Tauri app! 🚀</p>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  font-family: 'Times New Roman', Times, serif, sans-serif;
  color: #333;
  padding-bottom: 60px
}

.container {
  max-width: 100%;
  margin-left: 5%;
  margin-right: 5%;
  padding: 20px;
}

h1 {
  color: #ff5733;
}

h2 {
  color: #2ecc71;
}

p {
  color: #3498db;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', Courier, monospace;
}

ul {
  color: #3498db;
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
}
</style>
