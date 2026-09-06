import { supabase } from "@/app/lib/supabaseClient";

export const getCategories = async () => {
  const { data, error } = await supabase.from('categories').select()
  if (error) {
    console.error(error)
    return {
      success: false,
      data: [],
      error: error
    }
  }
  const categories = data.map((item) => {
      return {
          ...item,
          key: item.id
      }
  })
  return {
    success: true,
    data: categories,
    error: []
  }
}
