"use server";

export default async function unfollowUser({ username }: { username: string }) {
  try {
    // const res = await fetch(`/api/users/${username}/follow`, {
    //     method: "POST",
    // });
    // return res.json();
    console.log("unfollowUser", username);
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}
