export const PAGEURL: Record<string, string>  = {
    profile: '/',
    experiences: '/experiences',
    contact: '/contact',
    connect: '/connect',
}

export const SAPOPAGEURL: Record<string, string>  = {
    top: '/sapo',
    contact: '/sapo/contact',
    blog: '/sapo/blog',
    detailPost: '/sapo/blog/[uid]',
    priceList: '/sapo/priceList',
}

export const ADMINPAGEURL: Record<string, string>  = {
    dashboard: '/admin/dashboard',
    email: '/admin/contact',
    listUser: '/admin/user',
    createUser: '/admin/user/create',
    updateUser: '/admin/user/update',
    listPost: '/admin/posts',
    createPost: '/admin/posts/create',
    editPost: '/admin/posts/[uid]',
    config: '/admin/config'
}
