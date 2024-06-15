import { fallbackImgUrl } from "./constants";

export const handleImageError = (e) => {
    e.target.src = fallbackImgUrl;
};