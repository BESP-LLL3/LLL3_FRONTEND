/*
모든 앱의 라우팅을 관리함 <Routes>안에 추가하고 싶은데 있으면 적어주면 됨
인증이 필요하지 않은 경로는 /auth 링크로 타고가는데 저한테 말해주면됨
*/

import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "../../search/pages/SearchPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
    </Routes>
  );
};

export default AppRoutes;
