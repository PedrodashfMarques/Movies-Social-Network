export interface UserResponseData {
    userData: {
        first_name: string,
        username: string,
        last_name: string,
        location: string,
        small_bio: string,
        big_bio: string,
        user_image: string,
        background_image: string,
        is_verified: string | number,
        is_admin: string | number,
        category: string
    
      },
      userFollowers: Array<{
        user_following: number,
        first_name: string,
        username: string,
        last_name: string,
        user_image: string,
        is_verified: number,
      }>,
      userFollowing: Array<{
        user_followed: number,
        first_name: string,
        username: string,
        last_name: string,
        user_image: string,
        is_verified: number,
      }>,
    
      followersCount: {
        Total: number
      },
      followingCount: {
        Total: number
      },
      
      userPosts: Array<{
        first_name: string,
        username: string,
        last_name: string,
        user_image: string,
        post_id: number
        created_at : Date,
        content: string,
        likesNumber: string,
        isLiked: boolean
      }>,
}