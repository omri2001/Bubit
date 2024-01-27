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

const deleteFile = async (fileName, user) => {
  await BaseUrl.post(`delete`, fileName, {
    headers: { username: user, "content-type": "text/json" },
  });
};

const downloadFile = async (fileName, user) => {
  await BaseUrl.post(
    `get`,
    { file_name: fileName },
    {
      headers: { username: user, "content-type": "application/json" },
      responseType: "blob",
    }
  )
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    });
};
export default { fetchFiles, uploadFiles, deleteFile, downloadFile };
