const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0

            setInterval(() => {
                count++
                //needs to publish new data to all subscribers
                pubsub.publish('count', { count: count })
            },1000)

            return pubsub.asyncIterator('count')
        }
    },
    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info) {
            const post = db.posts.find((post) => post.id === postId && post.published)

            if(!post) {
                throw new Error('post not found')
            }

            return pubsub.asyncIterator(`comment ${postId}`) //channel would be called comment 23
        }
    }
}
export { Subscription as default }