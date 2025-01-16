import PostList from "@/components/Admin/PostList";
import React from "react";
import BackToAdmin from "@/components/Admin/BackToAdmin";

const AdminPosts: React.FC = () => {
  return (
    <div className="p-4 bg-pearl min-h-screen">
      <BackToAdmin />
      <h1 className="text-2xl text-center mt-10 font-bold text-customGreen-900 mb-4">Gestión de Posts</h1>
      
      <PostList />
    </div>
  );
};

export default AdminPosts;
