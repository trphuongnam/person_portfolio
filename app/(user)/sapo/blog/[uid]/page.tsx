"use client";
import { useState, useEffect } from "react";
import { Row, Image } from 'antd';
import { supabase } from "@/app/lib/supabaseClient";
import { useParams } from "next/navigation"

const DetailPost = () => {
  const params = useParams()
  const [posts, setPosts] = useState([]) as any

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    const { data, error } = await supabase.from('posts').select().eq('id', params.uid)
    console.log(data)
    if (error) {
      console.error(error)
      return
    }
    setPosts(data)
  }

  const showDetailPost = () => {
    if (posts.length > 0) {
        return  (
            <div className="post-detail">
                <h1 className="post-detail__title">{posts[0].title}</h1>
                <p className="post-detail__description">{posts[0].description}</p>
                <p className="post-detail__content">{posts[0].content.replace(/\\n/g, "")}</p>
                <div className="post-detail__image">
                    <Image src={posts[0].image_url} width={300}/>
                </div>
            </div>
        );
    }

    return (<></>);
  }

  return (
    <div className="w-full">
      <section
        className="main-content"
      >
        <Row
          gutter={[48, 32]}
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
            {
                showDetailPost()
            }
        </Row>
      </section>
    </div>
  );
};

export default DetailPost;
