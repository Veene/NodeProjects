const Query = {
    users(parent, args, { db }, info) {
        if(!args.query) {
            return db.users
        }
        return db.users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()))
    },
    posts(parent, args, { db }, info){
        if(!args.query) {
            return db.posts
        }
        return db.posts.filter((post) => post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())) 
       
    },
    comments(parent, args, { db }, info) {
        if(!args.query) {
            return db.comments
        }
        return db.comments.filter((comment) => comment.text.toLowerCase().includes(args.query.toLowerCase()))
    },
    me() {
        return {
            id: '123098',
            name: 'Mike',
            email: 'mike@example.com',
            age: 28
        }
    },
    post() {
        return {
            id: '1234',
            title: 'Title 1',
            body: 'Body 1',
            published: true
        }
    }
}
export { Query as default }