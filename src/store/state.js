// https://vuex.vuejs.org/en/state.html

export default {
  sidebarCollapse: false,
  sidebarItems: [
    { id: 'oejlmua5-fkop-max948', name: 'Main Navigation', type: 'header', depth: 1 },
    { id: '57qqfmhq-iow3-3v5rry', name: 'Home Menu', type: 'link', depth: 1, active: false, url: 'home' },
    {
      id: '4aaz9ngu-rm6h-9ryo2s',
      name: 'Sub Menu',
      type: 'toggle',
      depth: 1,
      active: false,
      open: false,
      children: [
        { id: 'fei5qfuo-1fh7-zncvgf', name: 'Contact', type: 'link', depth: 2, active: false, url: 'contact', parentId: '4aaz9ngu-rm6h-9ryo2s' },
        { id: 'f9m8wi85-a1xl-nttd0q', name: '3rd Level', type: 'toggle', depth: 2, active: false, open: false, children: [{ id: 'tg0m500g-upmm-txm0dm', name: 'Admin', type: 'link', depth: 3, active: false, url: 'admin', parentId: '4aaz9ngu-rm6h-9ryo2s' }], parentId: '4aaz9ngu-rm6h-9ryo2s' }
      ]
    },
    { id: 'j5osvkan-u0ip-19a7zi', name: 'Treeview', type: 'toggle', depth: 1, active: false, open: false, children: [{ id: 'uzrv16cc-r5po-j3j5kw', name: 'Blog', type: 'link', depth: 2, active: false, url: 'blog', parentId: 'j5osvkan-u0ip-19a7zi' }] },
    { id: 'zyoogw3z-7xqr-sotdu2', name: 'Menu 01', type: 'toggle', depth: 1, active: false, open: false, children: [{ id: '4gxrijxi-v2hq-846xqw', name: 'Dashboard', type: 'link', depth: 2, active: false, url: 'dashboard', parentId: 'zyoogw3z-7xqr-sotdu2' }] },
    { id: 'aaaaaaaa-bbbb-cccccc', name: 'Trello', type: 'link', depth: 1, active: false, url: 'trello' }
  ]
}
