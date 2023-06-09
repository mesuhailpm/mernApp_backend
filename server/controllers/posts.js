import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"
export const getPosts = async (req,res)=>{
    try {
        // res.send('This Worked')
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
        console.log('request is made on ',req.url,'req type: ',req.method)
    } catch (error) {
        console.log(error)

    }

}

export const createPost = async(req,res)=>{
    console.log('Creating a post')
    console.log(' request is made on url ',req.url,'with req type: ',req.method, 'reqest body is ',req.body)
        const post = req.body
        const newPost = new PostMessage(post)
        try {
            await newPost.save()
            res.status(201).json(newPost);

        } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error)
        }
}

export const deletePost = async(req,res)=>{
    const userId = req.userId
    const id = req.params.id //postID
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')
    const currentPost = await PostMessage.findById(id)
    if(currentPost.creator!==userId) return res.status(404).send('Unable to delete other\'s post')
    await PostMessage.findByIdAndRemove(id)
    //logging into console
    console.log(' request is made on url ',req.url,'with req type: ',req.method, 'reqest body is ',req.body,'id to delete is ',id)
    res.json({ message: "Post deleted successfully." });

}
export const updatePost=async(req,res)=>{
    const {id}= req.params
    const updatedPost = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')
    const updatedPosts = await PostMessage.findByIdAndUpdate(id,updatedPost)
    res.json(updatedPosts)

}
export const likePost =async(req,res) => {
    const {id} = req.params//postID
    if (!req.userId)    return res.json({ message: "Unauthenticated" });
    let userId  = req.userId

    console.log(' request is made on url ',req.url,'with req type: ',req.method, 'reqest body is ',req.body)

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID')
    let post = await PostMessage.findById(id)
    const index = post.likes.indexOf(userId)
    let updatedPost
    if (index === -1) {
        updatedPost = await PostMessage.findByIdAndUpdate(id,{likes:[...post.likes,userId]})
        } else {updatedPost = await       PostMessage.findByIdAndUpdate(id,{likes:[...post.likes.filter(user=>user!==userId)]})}

    console.log(updatedPost)
    res.json(updatedPost)
}
