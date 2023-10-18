export const imageUploader = async (image) => {
  const imageHostKey = process.env.NEXT_PUBLIC_IMAGEBB_KEY;
  //console.log(imageHostKey);
  const formData = new FormData();
  formData.append("image", image);
  console.log(image);
  const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  console.log(data);
  return data;
};
