"use client";
import { useState, useEffect } from "react";
import { Col, Row, Pagination, Button, Tooltip } from 'antd';
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { SAPOPAGEURL } from "@/app/common/util/constants";

const Blog = () => {
  const PAGE_SIZE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const router = useRouter()

  const [posts, setPosts] = useState([]) as any

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    const { data, error } = await supabase.from('posts').select().neq('category_id', '063bd274-505e-4398-8c7c-beb257af2601')
    console.log(data)
    if (error) {
      console.error(error)
      return
    }
    setPosts(data)
  }

  const currentPosts = posts.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const onViewDetail = (postId: string) => {
    const pageUrl = SAPOPAGEURL.detailPost.replace('[uid]', postId)
    router.push(pageUrl)
  }

  return (
    <div className="w-full">
      <section
        style={{
          background: "linear-gradient(135deg, #e6f4ff 0%, #ffffff 100%)",
          padding: "80px 40px",
        }}
      >
        <Row
          gutter={[48, 32]}
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {currentPosts.map((post: any, index: number) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              key={startIndex + index}
              className="post-item"
            >
              <img
                src={post.image_url}
                alt={`Image ${startIndex + index + 1}`}
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  objectFit: "cover",
                  borderRadius: 8,
                  display: "block",
                }}
                className="post-item__image"
              />
              <div className="post-item__title">
                <Tooltip placement="top" title={post.title}>
                  <Button type="link" onClick={() => onViewDetail(post.id)}>{post.title}</Button>
                </Tooltip>
              </div>
            </Col>
          ))}
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={posts.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </section>
    </div>
  );
};

export default Blog;
