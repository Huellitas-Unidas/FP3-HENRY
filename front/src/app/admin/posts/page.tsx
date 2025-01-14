import PostList from "@/components/Admin/PostList";
import React from "react";
import BackToAdmin from "@/components/Admin/BackToAdmin";

const AdminPosts: React.FC = () => {
  return (
    <div className="p-4 bg-pearl min-h-screen">
      <BackToAdmin />
      <h1 className="text-2xl font-bold text-customGreen-900 mb-4">Gestión de Posts</h1>
      <p className="text-customGreen-700">Aquí puedes gestionar los posts publicados.</p>
      <PostList />
    </div>
  );
};

export default AdminPosts;
