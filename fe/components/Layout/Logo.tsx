import Link from 'next/link';

export default function Logo() {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link href={{ pathname: '/' }}>
        <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent">
          LuckYou
        </span>
      </Link>
    </div>
  );
}
