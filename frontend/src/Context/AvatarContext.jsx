import React, { createContext, useState, useContext } from "react";

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(
    "https://i.pinimg.com/736x/23/cb/f8/23cbf8290d85aab5ae0633dacf5214a3.jpg" // Hình ảnh mặc định
  );

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => useContext(AvatarContext);