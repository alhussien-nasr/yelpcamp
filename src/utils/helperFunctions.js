export const BASEURL = "https://yelpcamp-api.onrender.com/campgrounds";

export const getCampgrounds = async () => {
  try {
    const res = await fetch(BASEURL, { credentials: "include" }).then((res) =>
      res.json()
    );
    console.log(res, "getCampgrounds result");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postCampgrounds = async (camp, imgs) => {
  const formData = new FormData();
  // Object.keys(camp).forEach((key) => {
  //   formData.append(key, camp[key]);
  // });
  formData.append("data", JSON.stringify(camp));

  Object.keys(imgs).forEach((key) => {
    formData.append("images", imgs[key]);
  });

  try {
    const data = await fetch("https://yelpcamp-api.onrender.com/campgrounds/", {
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((res) => res);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCampgroundByid = async (id) => {
  try {
    const res = await fetch(
      `https://yelpcamp-api.onrender.com/campgrounds/${id}`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const editCampground = async (camp, imgs, imageToDelete) => {
  try {
    const formData = new FormData();
    // Object.keys(camp).forEach((key) => {
    //   formData.append(key, camp[key]);
    // });
    formData.append("data", JSON.stringify(camp));

    Object.keys(imgs).forEach((key) => {
      formData.append("images", imgs[key]);
    });
    const res = await fetch(
      `https://yelpcamp-api.onrender.com/campgrounds/${camp._id}`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    ).then((res) => res.json());
    console.log(res);
  } catch (error) {
    console.log(error, "err");
  }
};

export const postReview = async (id, review) => {
  try {
    const { error } = await fetch(
      `https://yelpcamp-api.onrender.com/campgrounds/${id}/reviews`,
      {
        body: JSON.stringify(review),
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((val) => val.json());
    return error;
  } catch (error) {
    console.log(error);
  }
};
