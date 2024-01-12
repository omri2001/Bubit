import axios from "axios";

const BaseUrl = axios.create({
  baseURL: `http://localhost:8000/`,
});

const fetchFiles = async (user) => {
  const files = await BaseUrl.post(
    `files`,
    {},
    { headers: { username: user, "content-type": "text/json" } }
  )
    .then((res) => {
      if (res.status != 200) {
        throw new Error("Problem with server-side");
      }
      return res.data.files;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch or parsing
      console.error(error);
      throw error;
    });
  return files;
};

const uploadFiles = async (formData, user) => {
  await BaseUrl.post(`upload`, formData, {
    headers: {
      username: user,
      "content-type": "multipart/form-data",
    },
  }).catch((error) => {
    // Handle any errors that occurred during the fetch or parsing
    console.error(error);
    throw error;
  });
};
export default { fetchFiles, uploadFiles };
