export default [
  {
    path: '/default',
    name: 'Default',
    view: 'layouts/Default',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        view: 'pages/Home',
        meta: { isPublic: false }
      },
      {
        path: '/about',
        name: 'About',
        view: 'pages/About',
        meta: { isPublic: true }
      },
      {
        path: '/contact',
        name: 'Contact',
        view: 'pages/Contact',
        meta: { isPublic: true }
      },
      {
        path: '/blog',
        name: 'Blog',
        view: 'pages/Blog',
        meta: { isPublic: true }
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        view: 'pages/Dashboard',
        meta: { isPublic: false }
      },
      {
        path: '/admin',
        name: 'Admin',
        view: 'pages/Admin',
        meta: { isPublic: false }
      }
    ]
  }
]
