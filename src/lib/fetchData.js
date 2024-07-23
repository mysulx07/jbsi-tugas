// @ts-nocheck
export default async function (method, url, data = []) {
  let option = {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  if (method == "GET") {
    option = {
      method,
    };
  }

  // console.log(option);

  try {
    const response = await fetch(url, option);
    let data = await response.json();
    if (!response.ok) {
      return { status: false, error: response.status, message: data.message };
    }
    return { status: true, data: data.data };
  } catch (error) {
    return { status: false, error: error.message };
  }
}
