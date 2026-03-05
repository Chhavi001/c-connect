import { useAuthStore } from "../store/useAuthStore";

function LoginPage(){
  const {authUser,login,isLoggedIn}=useAuthStore();
  return(
    <div>loginpage</div>
  )
}
export default LoginPage;