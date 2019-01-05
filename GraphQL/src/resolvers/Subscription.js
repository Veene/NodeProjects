const Subscription = {
    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info) {
            const post = db.posts.find((post) => post.id === postId && post.published)

            if(!post) {
                throw new Error('post not found')
            }

            return pubsub.asyncIterator(`comment ${postId}`) //channel would be called comment 23
        }
    },
    post: {
        subscribe(parent, args, ctx, info) {
            return ctx.pubsub.asyncIterator('posts') //channel is posts because we are just keeping track of any post being created
        }
    }
}
export { Subscription as default }