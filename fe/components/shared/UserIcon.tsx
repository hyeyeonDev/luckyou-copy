import { User } from 'lucide-react';

const UserIcon = () => {
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900">
      <User size={18} className="text-purple-600 dark:text-purple-300" />
    </div>
  );
};

export default UserIcon;
