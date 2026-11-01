import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import logoLight from './assets/logo-light@3x.png';
import logoDark from './assets/logo-dark@3x.png';

interface Props {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-12',
}

const Logo = ({ size = 'md' }: Props) => (
  <span className="inline-flex">
    <Image src={logoLight} alt="Leverages" loading="eager" className={cn('w-auto dark:hidden', sizeClass[size])} />
    <Image src={logoDark} alt="Leverages" loading="eager" className={cn('w-auto hidden dark:block', sizeClass[size])} />
  </span>
)

export default Logo;
