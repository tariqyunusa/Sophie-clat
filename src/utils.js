export const items = [
  {
    name: "Allure",
    year: "( 2024)",
    subItems: ["Shoes", "Bags", "Half Shoes"],
    Img: "/image-1.webp",
  },
  {
    name: "Splendor",
    year: "( 2023)",
    subItems: ["Shoes", "Bags", "Half Shoes"],
    Img: "/image-25.webp",
  },
  {
    name: "Radiance",
    year: "( 2022)",
    subItems: ["Shoes", "Bags", "Half Shoes"],
    Img: "/image-28.webp",
  },
  {
    name: "Opulence",
    year: "( 2021)",
    subItems: ["Shoes", "Bags", "Half Shoes"],
    Img: "/image-27.webp",
  },
  {
    name: "ELEGANCE",
    year: "( 2020)",
    subItems: ["Shoes", "Bags", "Half Shoes"],
    Img: "/image-26.webp",
  },
];

export const getImages = () => {
  const images = []

  for (let i = 1; i <= 28; i++) {
    images.push(`/image-${i}.webp`)
  }

  return images
}