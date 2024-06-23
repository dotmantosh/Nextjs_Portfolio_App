import { PixelCrop } from "react-image-crop";

const setCanvasPreview = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  ctx.translate(-cropX, -cropY)

  ctx.drawImage(
    image,
    0, 0, image.naturalWidth, image.naturalHeight, // Source rectangle
    0, 0, image.naturalWidth, image.naturalHeight // Destination rectangle
  );

  ctx.restore();
};

export default setCanvasPreview

// Example usage:
// const image = new Image();
// image.src = 'path/to/image.jpg';
// const canvas = document.createElement('canvas');
// const crop = { x: 10, y: 10, width: 100, height: 100 };

// image.onload = () => {
//   setCanvasPreview(image, canvas, crop);
//   document.body.appendChild(canvas); // Append the canvas to the body to see the result
// };
