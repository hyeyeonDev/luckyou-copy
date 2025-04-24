import CustomButton from '@/components/shared/Custom/CustomButton';
import { useAuth } from '@/context/AuthContext';

const SignOutButton = () => {
  const { signOut } = useAuth();
  return <CustomButton onClick={signOut}>SignOut</CustomButton>;
};
export default SignOutButton;
