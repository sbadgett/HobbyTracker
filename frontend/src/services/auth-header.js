export default function AuthHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    //Embeds accesstoken into header of html request so backend can check if logged in user is authorized
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
