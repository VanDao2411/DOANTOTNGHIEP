import React, { createContext, useState, useContext } from "react";

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(
    "https://i.pinimg.com/736x/d3/1e/d3/d31ed398b01ae710f3ba775d4fd741e5.jpg" // Hình ảnh mặc định
  );

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => useContext(AvatarContext);