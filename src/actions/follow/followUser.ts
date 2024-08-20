"use server";

export default async function followUser({ username }: { username: string }) {
  try {
    // const res = await fetch(`/api/users/${username}/follow`, {
    //     method: "POST",
    // });
    // return res.json();
    console.log("followUser", username);
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}
