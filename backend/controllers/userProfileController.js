import User from "../models/User.js"

export const getUserProfile = async (req, res) =>{
    try{
        const userProfile = await User.findById(req.user.id).select("-password");
        if(!userProfile){
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        res.json({
            success: true,
            message: "User found!",
            data: userProfile
        })
    }
    catch(err){
        console.log("Error while searching user: ", err.message);
        res.json({
            success: false,
            message: "User Not Found!"
        })
    }
}
export const updateUserProfile = async (req, res) =>{
    const data = req.body;
    try{
        const userProfile = await User.findByIdAndUpdate(req.user.id, data, {returnDocument: "after"}).select("-password");
        if(!userProfile){
            return res.json({
                success: false,
                message: "User not found to update!"
            })
        }
        res.json({
            success: true,
            message: "User found and updated!",
            data: userProfile
        })
    }
    catch(err){
        console.log("Error while updating user: ", err.message);
        res.json({
            success: false,
            message: "User Not Found!"
        })
    }
}