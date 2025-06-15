export const isAuthenticated = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/home/", {
      method: "GET",
      credentials: "include", // for cookies
    });

    // if (!res.ok) throw new Error("Unauthorized");

    const data = await res.json();
    console.log(data)
    if(data.success === true){
      return data
    }
    return false;
  } catch (err) {
    return false;
  }
};
