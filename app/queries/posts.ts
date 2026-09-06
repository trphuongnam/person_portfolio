import { supabase } from "@/app/lib/supabaseClient";

export const getPosts = async (limit?: number, all: boolean = true) => {
  const query = supabase.from('posts').select()
  if (limit) {
    query.range(0, limit)
  }
  if (!all) {
    query.neq('category_id', '063bd274-505e-4398-8c7c-beb257af2601')
  }
  query.neq('status', 3).order('created_at', {ascending: false})

  const { data, error } = await query
  if (error) {
    console.error(error)
    return {
      success: false,
      data: [],
      error: error
    }
  }
  const posts = data.map((item) => {
      return {
          ...item,
          key: item.id
      }
  })
  return {
    success: true,
    data: posts,
    error: []
  }
}

export const getPostById = async (postId: string) => {
  const { data, error } = await supabase.from('posts').select().eq('id', postId).single()
  if (error) {
    console.error(error)
    return {
      success: false,
      data: [],
      error: error
    }
  }
  return {
    success: true,
    data,
    error: ''
  }
}

export const updatePosts = async (
  postId: string,
  data: {
    title?: string
    description?: string
    content?: string
    imageUrl?: string
    location_display?: string
    status?: number
  }
) => {
  const { data: result, error } = await supabase
    .from('posts')
    .update(data)
    .eq('id', postId)
    .select()
    .single()

  if (error) {
    return {
      success: false,
      data: {},
      error: error
    };
  }

  return {
    success: true,
    data: result,
    error: ''
  };
}

export const createPosts = async (
  data: {
    title: string
    description: string
    content: string
    image_url: string
    location_display: string
    status: number
    user_id?: string
    category_id: string
    created_at: string
    updated_at: string
  }
) => {
  const { data: result, error } = await supabase
    .from('posts')
    .insert(data)
    .select()
    .single()

  if (error) {
    return {
      success: false,
      data: {},
      error: error
    };
  }

  return {
    success: true,
    data: result,
    error: ''
  };
}
