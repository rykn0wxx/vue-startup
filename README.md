# VueJS Startup Project

A simple starter project for [VueJS](https://github.com/vuejs/vue) with [Tailwind](https://github.com/tailwindlabs/tailwindcss), [VueX](https://github.com/vuejs/vuex), [VueRouter](https://github.com/vuejs/vue-router) and [Vue-Meta](https://github.com/nuxt/vue-meta)


## To get started:


1. Clone the repository:

   ```bash
   git clone --depth 1 https://github.com/rykn0wxx/vue-startup.git vue-startup

   cd vue-startup
   ```

2. Install the dependencies:

   ```bash
   # Using Yarn
   yarn install
   ```

3. Start the development server:

   ```bash
   # Using Yarn
   yarn serve
   ```

> Now you should be able to see the project running at localhost:8181.

___


## Tailwind CSS and PostCSS error


1. Remove the default tailwind, postcss and autoprefixer:
   ```bash
   yarn remove tailwindcss postcss autoprefixer
   ```

2. Reinstall tailwindcss, postcss and autoprixer:
   ```bash
   yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
   ```
